const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const router = express.Router();

router.post("/", async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  let stake = await user.aggregate([
    {
      $set: {
        stakes: { aqua: true },
      },
    },
  ]);
  res.send(stake);
});

module.exports = router;
