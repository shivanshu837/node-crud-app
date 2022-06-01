const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user_route");

const url = "mongodb://localhost:27017/test";
const port = 8000;

mongoose.connect(url, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.on("open", () => console.log("Database connected"));

const app = express();

app.use("/users", router);

app.get("/", (req, res) => {
  res.status(200).send("This is the homepage");
});

app.listen(port, () =>
  console.log(`Server started at http://localhost:${port}`)
);
