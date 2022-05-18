const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
express.use(cors());

const db = require("./models");

//Routes
const users = require("./routes/Users");
app.use("/users", users);
const poems = require("./routes/Pieces");
app.use("/poems", poems);
const comment = require("./routes/Comment");
app.use("/comment", comment);
const favorites = require("./routes/Favorites");
app.use("/favorite", favorites);

db.sequelize
  .sync()
  .then(() => {      
    app.listen(process.env.PORT || 3001, () => {
      console.log("Server Started...");
    });
  })
  .catch((err) => {
    console.log(`Error connecting : ${err.message}`);
  });
