const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const User = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  // First Validate The HTTP Request
  const loginSchema = Joi.object().keys({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //  Now find the user by their email address
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Incorrect email or password.");
  }

  // Then validate the Credentials in MongoDB match
  // those provided in the request
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Incorrect email or password.");
  }
  const token = jwt.sign({ _id: user._id }, config.get("PrivateKey"));
  const stakes = Object.fromEntries(
    Object.entries(user._doc.stakes).map(([key, val]) => [key, val])
  );

  const obj = _.pick(user, ["_id", "name", "email"]);

  obj.stakes = stakes;

  res.header("x-auth-token", token).send(obj);
});

module.exports = router;
