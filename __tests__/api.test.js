const request = require("supertest");
const app = require("../app")

//database 
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


describe("GET (inexistent endpoint) ~ Should return error", () => {
    test("/api/topicsss ~ 404", () => {
        return request(app).get("/api/topicsss").expect(404).then((res) => {
            const {message} = res.body;
            expect(message).toBe("Endpoint not found");
        })
    })
})