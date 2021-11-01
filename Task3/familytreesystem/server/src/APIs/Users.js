const express = require("express");
const router = express.Router();
const User = require("../Controller/Function_user");

router.post("/add", async (req, res) => {
  let results = await User.add(req.body);

  res.send(results);
});

router.get("/get", async (req, res) => {
  let results = await User.get();

  res.send(results);
});

router.post("/update", async (req, res) => {
  const { query, data } = req.body;

  let results = await User.update(query, data);

  res.send(results);
});

router.post("/delete", async (req, res) => {
  let results = await User.remove(req.body);

  res.send(results);
});
module.exports = router;
