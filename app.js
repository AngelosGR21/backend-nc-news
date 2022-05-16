const express = require("express")
const app = express();

const { getTopics } = require("./controllers/topics");
const { 
    getArticle,
    patchArticle 
} = require("./controllers/articles")

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle)
app.patch("/api/articles/:article_id", patchArticle)

app.use("*", (req, res) => {
    res.status(404).send({message: "Endpoint not found"})
})

app.use((err, req, res, next) => {
    if(err.code === "22P02"){
        res.status(400).send({message: "Bad request"})
    }else if(err.code === "23502"){
        res.status(400).send({message : "Some values are missing"});
    }else{
        next(err);
    }
})


app.use((err, req, res, next) => {
    if(err.status){
        res.status(err.status).send({message: err.message});
    }else{
        next(err);
    }
})

app.use((err, req, res, next) => {
    res.status(500).send({message: "Internal server error!"});
})



module.exports = app;