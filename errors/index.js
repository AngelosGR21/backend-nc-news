

exports.psqlErrorHandler = (err, req, res, next) => {
    if(err.code === "22P02"){
        res.status(400).send({message: "Bad request"})
    }else if(err.code === "23502"){
        res.status(400).send({message : "Some values are missing"});
    }else if(err.code === "23503"){
        if(err.constraint === "comments_author_fkey"){
            res.status(404).send({message : "User was not found"})
        }else{
            res.status(404).send({message : "Article was not found"})
        }
    }else{
        next(err);
    }
}

exports.customErrorHandler = (err, req, res, next) => {
    if(err.status){
        res.status(err.status).send({message: err.message});
    }else{
        next(err);
    }
}

exports.serverErrorHandler = (err, req, res, next) => {
    res.status(500).send({message: "Internal server error!"});
}