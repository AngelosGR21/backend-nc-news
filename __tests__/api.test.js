const request = require("supertest");
const app = require("../app")

const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index.js");


afterAll(() => {
   return db.end();
})


beforeEach(() => {
    return seed(testData);
})

describe("GET /api/topics", () => {
    test("Returns an array of topic objects, each with the properties ~ slug and description", () => {
        return request(app).get("/api/topics").expect(200).then((res) => {
            const {topics} = res.body;

            topics.forEach((topic) => {
                expect(topic).toMatchObject({
                    slug : expect.any(String),
                    description : expect.any(String) 
                })
            })
        })
    })
})

describe("GET /api/articles/:article_id && Testing error handling", () => {
    test("Returns an object with the article found, the article should contain all 6 properties", () => {
        return request(app).get("/api/articles/1").expect(200).then((res) => {
            const { article } = res.body;
            expect(article).toMatchObject({
                author : "butter_bridge",
                title : "Living in the shadow of a great man",
                article_id : 1,
                body : "I find this existence challenging",
                topic : "mitch",
                created_at : "2020-07-09T20:11:00.000Z",
                votes : 100,
            })
        })
    })
    test("Checks for the key comment_count, with the total count of comments", () => {
        return request(app).get("/api/articles/1").expect(200).then((res) => {
            const {article} = res.body;
            expect(article).toHaveProperty("comment_count", "11");
        })
    })
    test("Returns 404 when the article with the id specified was not found", () => {
        return request(app).get("/api/articles/9999").expect(404).then((res) => {
            const { message } = res.body;

            expect(message).toBe("Article was not found")
        })
    })
    test("Returns 400 when a wrong data type was inserted", () => {
        return request(app).get("/api/articles/testingEndpoint").expect(400).then((res) => {
            const { message } = res.body

            expect(message).toBe("Bad request");
        })
    })
})

describe("PATCH /api/articles/:article_id && Testing error handling", () => {
    test("Increments the total number of votes", () => {
        const votesObj = { inc_votes : 5 };
        return request(app).patch("/api/articles/1").send(votesObj).expect(200).then((res) => {
            const { updatedArticle } = res.body;
            expect(updatedArticle).toMatchObject({
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: "2020-07-09T20:11:00.000Z",
                votes: 105,
            })
        })
    })
    test("Decrements the total number of votes", () => {
        const votesObj = { inc_votes : -5 };
        return request(app).patch("/api/articles/1").send(votesObj).expect(200).then((res) => {
            const { updatedArticle } = res.body;
            expect(updatedArticle).toMatchObject({
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: "2020-07-09T20:11:00.000Z",
                votes: 95,
            })
        })
    })
    test("400 ~ Bad request (wrong data type inserted)", () => {
        const votesObj = {inc_votes : "Test"};
        return request(app).patch("/api/articles/1").send(votesObj).expect(400).then((res) => {
            const { message } = res.body;
            expect(message).toBe("Bad request");
        })
    })
    test("400 ~ Bad request (values missing)", () => {
        const votesObj = {randomKey : 3};
        return request(app).patch("/api/articles/1").send(votesObj).expect(400).then((res) => {
            const { message } = res.body;
            expect(message).toBe("Some values are missing");
        })
    })
    test("404 ~ Bad request (id passed is invalid)", () => {
        const votesObj = {inc_votes : 3};
        return request(app).patch("/api/articles/9999").send(votesObj).expect(404).then((res) => {
            const { message } = res.body;
            expect(message).toBe("Article was not found");
        })
    })
    test("400 ~ Bad request (when a wrong data type was inserted)", () => {
        const votesObj = {inc_votes : 3};
        return request(app).patch("/api/articles/testingEndpoint").send(votesObj).expect(400).then((res) => {
            const { message } = res.body

            expect(message).toBe("Bad request");
        })
    })
})

describe("GET /api/users", () => {
    test("Returns an array of user objects, each with the properties ~ username, name and avatar", () => {
        return request(app).get("/api/users").expect(200).then((res) => {
            const {users} = res.body;
            expect(users).toHaveLength(4);
            users.forEach((user) => {
                expect(user).toMatchObject({
                    username: expect.any(String),
                    name: expect.any(String),
                    avatar_url: expect.any(String)
                })
            })
        })
    })
})

describe("GET /api/articles", () => {
    test("Checking each each article structure", () => {
        return request(app).get("/api/articles").expect(200).then((res) => {
            const {articles} = res.body;
            expect(articles).toHaveLength(12);
            articles.forEach((article) => {
                expect(article).toMatchObject({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id : expect.any(Number),
                    topic: expect.any(String),
                    created_at : expect.any(String),
                    votes: expect.any(Number),
                    comment_count : expect.any(String),
                })
            })
        })
    })
})

describe("GET /api/articles/:article_id/comments && Testing error handling", () => {
    test("200 - Returns an array of comment objects", () => {
        return request(app).get("/api/articles/1/comments").expect(200).then((res) => {
            const {comments} = res.body;
            expect(comments).toHaveLength(11);
            comments.forEach((comment) => {
                expect(comment).toMatchObject({
                    comment_id : expect.any(Number),
                    votes : expect.any(Number),
                    created_at : expect.any(String),
                    author : expect.any(String),
                    body : expect.any(String)
                })
            })
        })
    })
    test("200 - article is a valid id in the db, but has no comments associated with it", () => {
        return request(app).get("/api/articles/7/comments").expect(200).then((res) => {
            const {comments} = res.body;
            expect(comments).toHaveLength(0);
        })
    })
    test("400 - Bad request (passing incorrect data type)", () => {
        return request(app).get("/api/articles/test/comments").expect(400).then((res) => {
            const {message} = res.body;
            expect(message).toBe("Bad request");
        })
    })
    test("404 - Not found (passing an inexistent id)", () => {
        return request(app).get("/api/articles/9999/comments").expect(404).then((res) => {
            const { message } = res.body;
            expect(message).toBe("Article was not found");
        })
    })
})

describe("GET (inexistent endpoint) ~ Should return error", () => {
    test("/api/topicsss ~ 404", () => {
        return request(app).get("/api/topicsss").expect(404).then((res) => {
            const {message} = res.body;
            expect(message).toBe("Endpoint not found");
        })
    })
})
