const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
const corsOptions = {
  origin: "*",
  Accept: "application/json",
  "Content-Type": "application/json",
  credentials: true,
  headers: {
    "access-control-allow-credentials":
      "https://6279e77aeede7730607d6216--admirable-nasturtium-b65094.netlify.app/",
  },
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

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
