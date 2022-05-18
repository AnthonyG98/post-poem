const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, profile_picture, password } = req.body;
  const createdUser = bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      profile_picture: profile_picture,
      password: hash,
    });
  });
  res.json(username);
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    res.json({ error: "user does not exist" });
  } else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: "Wrong username or password" });
      } else {
        res.json("Logged in");
      }
    });
  }
});
router.get("/:user", async (req, res) => {
  const user = req.params.user;
  const userProfile = await Users.findOne({ where: { username: user } });

  res.json(userProfile);
});
router.put("/profile/:id", async (req, res) => {
  const profilePicture = req.params.id;
  const image = await Users.findOne({
    where: { id: profilePicture },
  });

  const { profile_picture } = req.body;

  image.profile_picture = profile_picture;

  await image.save();
  res.json("updated");
});
module.exports = router;
