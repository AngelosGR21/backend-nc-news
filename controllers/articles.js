const {
    fetchArticle,
    updateArticle,
    fetchAllArticles,
    fetchCommentsByArticleId,
    insertCommentOnArticleId
} = require("../models/articles");

exports.getArticle = (req, res, next) => {
    const { article_id } = req.params; 
    fetchArticle(article_id).then((article) => {
        res.status(200).send({ article });
    }).catch((err) => {
        next(err);
    })
}

exports.patchArticle = (req, res, next) => {
    const {article_id} = req.params;
    const {inc_votes} = req.body;

    updateArticle(article_id, inc_votes).then((updatedArticle) => {
        res.status(200).send({updatedArticle})
    }).catch((err) => {
        next(err);
    })
}

exports.getAllArticles = (req, res, next) => {
    fetchAllArticles(req.query).then((articles) => {
        res.status(200).send({articles});
    }).catch((err) => {
        next(err);
    })
}

exports.getCommentsByArticleId = (req, res, next) => {
    const {article_id} = req.params;
    fetchCommentsByArticleId(article_id).then((comments) => {
        res.status(200).send({comments})
    }).catch((err) => {
        next(err);
    })
}


exports.postCommentOnArticleId = (req, res, next) => {
    const {article_id} = req.params;
    insertCommentOnArticleId(article_id, req.body).then((comment) => {
        res.status(201).send({comment});
    }).catch((err) => {
        next(err);
    })
}