const express = require("express")
const app = express();

const articleRouter = require("./routers/articleRouter");
const topicsRouter = require("./routers/topicsRouter");
const commentsRouter = require("./routers/commentsRouter");
const usersRouter = require("./routers/usersRouter");

const {
    psqlErrorHandler,
    customErrorHandler,
    serverErrorHandler
 } = require("./errors");


app.use(express.json());

app.get("/api", (req, res, next) => {
    const data = require("./endpoints.json");
    if(data){
        res.status(200).send(data);
    }else{
        next()
    }
    
})
app.use("/api/articles", articleRouter);
app.use("/api/topics", topicsRouter)
app.use("/api/users", usersRouter)
app.use("/api/comments", commentsRouter)

app.use("*", (req, res) => {
    res.status(404).send({message: "Endpoint not found"})
})

app.use(psqlErrorHandler)
app.use(customErrorHandler)
app.use(serverErrorHandler)



module.exports = app;