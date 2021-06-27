const express = require("express");
const cron = require("node-cron");
const mongoose = require("mongoose");

const router = express.Router();

const Email = require("../models/email");
const auth = require("../middlewares/auth");

const { transporter, ScheduleEmail } = require("../middlewares/mailer");
const { MAILER_ID } = require("../config");

router.post("/email/schedule", auth, async (req, res) => {
  try {
    const email = new Email({ ...req.body, createdBy: req.user._id });

    const { to, cc, subject, html, option, time, date, day } = email;

    const hh = time.slice(0, 2);
    const mm = time.slice(3);
    const m = date.slice(5, 7);
    const dd = date.slice(8);

    const mailOptions = {
      from: MAILER_ID,
      to,
      cc,
      subject,
      html,
    };

    switch (option) {
      case 1:
        await transporter.sendMail(mailOptions, (err, info) => {
          if (err) throw new Error(err);
          console.log(email._id, "Email sent: " + info.response);
          email.history = [info.response];
        });
        email.isScheduled = false;
        break;
      case 2:
        email.cronExpression = "30 * * * * *";
        break;
      case 3:
        email.cronExpression = `${mm} ${hh} * * ${day}`;
        break;
      case 4:
        email.cronExpression = `${mm} ${hh} ${dd} * *`;
        break;
      case 5:
        email.cronExpression = `${mm} ${hh} ${dd} ${m} *`;
        break;
      default:
        return res.status(400).send({ error: "Bad request" });
    }

    await email.save();

    if (option !== 1) ScheduleEmail(email);

    res.status(201).send({
      success: "Email schdeuled!",
      isScheduled: email.isScheduled,
      cron: email.cronExpression,
      history: email.history,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: "Bad request!" });
  }
});

router.get("/email/drafts", auth, async (req, res) => {
  try {
    const myEmails = await Email.find({ createdBy: req.user._id });
    if (!myEmails) throw new Error();
    res.send({ allDrafts: myEmails });
  } catch (e) {
    console.log(e);
    res.status(404).send({ error: "No drafts found!" });
  }
});

router.post("/email/stop/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const email = await Email.findOneAndUpdate(
      { _id, createdBy: req.user._id },
      { isScheduled: false },
      { new: true }
    );

    if (!email) throw new Error();
    res.send({ email });
  } catch (e) {
    console.log(e);
    res.status(404).send({ error: "Draft not found!" });
  }
});

module.exports = router;
