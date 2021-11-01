const express = require("express");
const router = express.Router();

const Mange_User = require("../APIs/Users");

router.use("/users", Mange_User);

module.exports = router;
