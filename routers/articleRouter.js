const { 
    getArticle,
    patchArticle,
    getAllArticles,
    getCommentsByArticleId,
    postCommentOnArticleId
} = require("../controllers/articles")

const articleRouter = require('express').Router();

articleRouter.get("/", getAllArticles)
articleRouter
    .route("/:article_id/comments")
    .get(getCommentsByArticleId)
    .post(postCommentOnArticleId)
articleRouter
    .route("/:article_id")
    .get(getArticle)
    .patch(patchArticle)


module.exports = articleRouter;