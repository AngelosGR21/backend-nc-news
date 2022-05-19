const {fetchCommentsById, insertComment, removeComment} = require("../models/comments");

exports.getCommentsById = (req, res, next) => {
    const {article_id} = req.params;
    fetchCommentsById(article_id).then((comments) => {
        res.status(200).send({comments})
    }).catch((err) => {
        next(err);
    })
}


exports.postComment = (req, res, next) => {
    const {article_id} = req.params;
    insertComment(article_id, req.body).then((comment) => {
        res.status(201).send({comment});
    }).catch((err) => {
        next(err);
    })
}

exports.deleteComment = (req, res, next) => {
    const {comment_id} = req.params;
    removeComment(comment_id).then(() => {
        res.status(204).send({});
    }).catch((err) => {
        next(err);
    })
}