const express = require("express");
const router = express.Router();
const { Favorites } = require("../models");

router.post("/", async (req, res) => {
  const { title, piece, author, UserId } = req.body;
  const createdFavorite = Favorites.create({
    title: title,
    author: author,
    piece: piece,
    UserId: UserId,
  });
  res.json("Added to favorites.");
});
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const allUserFavs = await Favorites.findAll({ where: { UserId: userId } });

  res.json(allUserFavs);
});
router.delete("/delete/:id", async (req, res) => {
  const userId = req.params.id;
  const favPoems = await Favorites.destroy({ where: { id: userId } });

  res.json("Deleted");
});
module.exports = router;
