const express = require("express");
const router = express.Router();
const User = require("../Controller/Function_user");

router.post("/add", async (req, res) => {
  console.log(req.body);

  let results = await User.add(req.body);

  res.send(results);
});

router.get("/get", async (req, res) => {
  const { name } = req.query;

  console.log(name);

  let results = await User.get(name);

  res.send(results);
});

router.post("/update", async (req, res) => {
  let results = await User.update(req.body);

  res.send(results);
});
module.exports = router;
