const { fetchArticle, updateArticle, fetchAllArticles } = require("../models/articles");

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
    fetchAllArticles().then((articles) => {
        res.status(200).send({articles});
    }).catch((err) => {
        next(err);
    })
}