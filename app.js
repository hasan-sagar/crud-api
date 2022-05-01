const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const authenticationRoute = require("./routes/authentication");
const usersRoute = require("./routes/user");
const todoRoute = require("./routes/todo");
const cors = require("cors");
app.use(cors());
app.use(express.json());

//mongoose connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", authenticationRoute);
app.use("/api/user", usersRoute);
app.use("/api/todo", todoRoute);

app.listen(process.env.PORT, () => {
  console.log("Server Is Running on port " + process.env.PORT);
});
