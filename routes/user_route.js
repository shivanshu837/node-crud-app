const express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/user");

const router = express.Router();
router.use(bodyParser.json());

router.get("/", async (req, res) => {
  const { name } = req.query;
  console.log("name", name);
  if (!name) {
    res.status(200).json(await User.find());
  } else {
    res.status(200).json(await User.find({ name }));
  }
});

router.post("/add", async (req, res) => {
  const { name, age, tech } = req.body;
  const user = new User({ name, age, tech });
  res.status(200).json(await user.save());
});

router.put("/update", async (req, res) => {
  const { name, age, tech } = req.body;
  const result = await User.find({ name });
  console.log("result", result);
  if (result) {
    await User.updateOne({ name }, { name, age, tech });
    res.status(200).send("User updated successfully");
  } else {
    res.status(403).send("Not found");
  }
});

module.exports = router;
