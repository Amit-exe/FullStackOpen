const commentRouter = require("express").Router();
const {
  getComments,
  createComment,
  deleteComment,
} = require("../controllers/comment.controller");

commentRouter.get("/:blogId/comments", (request, response) =>
  getComments(request, response),
);

commentRouter.post("/:blogId/comments", (request, response) =>
  createComment(request, response),
);

commentRouter.delete("/:blogId/comments/:commentId", (request, response) =>
  deleteComment(request, response),
);

module.exports = commentRouter;
