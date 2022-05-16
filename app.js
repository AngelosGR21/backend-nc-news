const express = require("express")
const app = express();

const {getTopics} = require("./controllers/topics");

app.get("/api/topics", getTopics);


app.use("*", (req, res) => {
    res.status(404).send({message: "Endpoint not found"})
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