const Wells = require("../models/wells");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  let wells = await Wells.findAll({});
  res.send(wells);
});

module.exports = router;
