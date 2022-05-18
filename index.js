const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use((req, res, next) => {
  //allow access from every, elminate CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.removeHeader("x-powered-by");
  //set the allowed HTTP methods to be requested
  //   res.header("Access-Control-Allow-Methods", "POST");
  //headers clients can use in their requests
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  //allow request to continue and be handled by routes
  next();
});
app.use(cors());

const db = require("./models");

//Routes
const users = require("./routes/Users");
app.use("/users", users, cors());
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
