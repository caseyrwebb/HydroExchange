const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const router = express.Router();

router.post("/", async (req, res, next) => {
  const userSchema = Joi.object().keys({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("That user already exisits!");
  } else {
    // Insert the new user if they do not exist yet
    user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = jwt.sign({ _id: user._id }, config.get("PrivateKey"));
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "email"]));
  }
});

module.exports = router;
