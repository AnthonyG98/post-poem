const express = require("express");
const router = express.Router();
const { Poems } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { title, piece, author, profile_picture, UserId } = req.body;
  const createdPoem = Poems.create({
    title: title,
    profile_picture: profile_picture,
    author: author,
    piece: piece,
    UserId: UserId,
  });

  res.json("Poem is posted!");
});
router.put("/profile/:id", async (req, res) => {
  const profilePicture = req.params.id;
  const image = await Poems.findAll({
    where: { UserId: profilePicture },
  });

  const { profile_picture } = req.body;

  //   image.profile_picture = profile_picture;
  await Poems.update(
    { profile_picture: profile_picture },
    {
      where: {
        UserId: profilePicture,
      },
    }
  );
  //   await image.saveAll();

  res.json("updated pieces profile picture");
});
router.get("/all", async (req, res) => {
  const allPoems = await Poems.findAll();
  res.json(allPoems);
});
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const allPoems = await Poems.findAll({ where: { UserId: userId } });
  res.json(allPoems);
});
router.get("/piece/:id", async (req, res) => {
  const poemId = req.params.id;
  const piece = await Poems.findOne({ where: { id: poemId } });
  res.json(piece);
});
module.exports = router;
