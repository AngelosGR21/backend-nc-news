const express = require("express")
const app = express();

const { getUsers } = require("./controllers/users");
const { getTopics } = require("./controllers/topics");
const { 
    getArticle,
    patchArticle 
} = require("./controllers/articles")

const {
    psqlErrorHandler,
    customErrorHandler,
    serverErrorHandler
 } = require("./errors/");


app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/users", getUsers);

app.get("/api/articles/:article_id", getArticle)
app.patch("/api/articles/:article_id", patchArticle)

app.use("*", (req, res) => {
    res.status(404).send({message: "Endpoint not found"})
})

app.use(psqlErrorHandler)
app.use(customErrorHandler)
app.use(serverErrorHandler)



module.exports = app;