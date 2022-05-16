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
                author : expect.any(String),
                title : expect.any(String),
                article_id : expect.any(Number),
                body : expect.any(String),
                topic : expect.any(String),
                created_at : expect.any(String),
                votes : expect.any(Number)
            })
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


describe("GET (inexistent endpoint) ~ Should return error", () => {
    test("/api/topicsss ~ 404", () => {
        return request(app).get("/api/topicsss").expect(404).then((res) => {
            const {message} = res.body;
            expect(message).toBe("Endpoint not found");
        })
    })
})