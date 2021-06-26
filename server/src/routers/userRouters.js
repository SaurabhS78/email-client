const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/users/register", async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.getAuthToken();
    res.status(201).send({ name: user.name, email: user.email, token });
  } catch (e) {
    res.status(400).send("Invalid request");
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCreds(req.body.email, req.body.password);
    const token = await user.getAuthToken();
    res.send({ name: user.name, email: user.email, token });
  } catch (e) {
    res.status(400).send("Invalid request");
  }
});

//TODO: Logout route

module.exports = router;
