const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const { OAUTH_CLIENT_ID } = require("../config");

const client = new OAuth2Client(OAUTH_CLIENT_ID);

const User = require("../models/user");
const auth = require("../middlewares/auth");

router.post("/users/register", async (req, res) => {
  try {
    if (req.body.isOauth) throw new Error();

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

router.post("/users/oauth", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: OAUTH_CLIENT_ID,
    });

    const { name, email } = ticket.getPayload();

    const user = await User.findOneAndUpdate(
      { email },
      { name, email, isOauth: true },
      { upsert: true, new: true }
    );

    const jwttoken = await user.getAuthToken();
    res.send({ name: user.name, email: user.email, token: jwttoken });
  } catch (e) {
    console.log(e);
    res.status(500).send("Something went wrong!");
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    const user = req.user;
    user.tokens = [];
    user.save();
    res.send("Successfully logged out!");
  } catch (e) {
    res.status(500).send("Something went wrong!");
  }
});

router.get("/users/me", auth, async (req, res) => {
  try {
    const user = req.user;
    res.send({ name: user.name, email: user.email });
  } catch (e) {
    res.status(404).send("User not found!");
  }
});

module.exports = router;
