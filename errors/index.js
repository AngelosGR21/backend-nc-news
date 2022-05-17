

exports.psqlErrorHandler = (err, req, res, next) => {
    if(err.code === "22P02"){
        res.status(400).send({message: "Bad request"})
    }else if(err.code === "23502"){
        res.status(400).send({message : "Some values are missing"});
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