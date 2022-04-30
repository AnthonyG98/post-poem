const express = require("express");
const router = express.Router();
const { Comment } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { comment, username, profile_picture, poemId } = req.body;
  const createdComment = Comment.create({
    comment: comment,
    profile_picture: profile_picture,
    username: username,
    PoemId: poemId,
  });

  res.json("Comment is posted!");
});
router.get("/:id", async (req, res) => {
  const commentId = req.params.id;
  const comment = await Comment.findAll({ where: { PoemId: commentId } });
  res.json(comment);
});
module.exports = router;
