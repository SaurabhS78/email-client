const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const { OAUTH_CLIENT_ID } = require("../config");

const client = new OAuth2Client(OAUTH_CLIENT_ID);

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
      { name, email },
      { upsert: true }
    );

    const jwttoken = await user.getAuthToken();
    res.send({ name: user.name, email: user.email, jwttoken });
  } catch (e) {
    res.status(500).send("Something went wrong!");
  }
});

//TODO: Logout route

module.exports = router;
