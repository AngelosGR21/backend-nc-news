const { deleteComment, patchCommentVotes } = require("../controllers/comments");

const commentsRouter = require('express').Router();

commentsRouter.route("/:comment_id")
              .patch(patchCommentVotes)
              .delete(deleteComment)




module.exports = commentsRouter