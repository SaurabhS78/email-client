const express = require("express");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const mongoose = require("mongoose");

const router = express.Router();

const Email = require("../models/email");

router.post("/email/compose", async (req, res) => {
  try {
    // email schema instance created
    const email = new Email(req.body);

    const { to, cc, subject, html, option, time, date, day } = email;

    const hh = time.slice(0, 2);
    const mm = time.slice(3);
    const m = date.slice(5, 7);
    const dd = date.slice(8);

    const mailOptions = {
      from: "xmail.client@gmail.com",
      to,
      cc,
      Subject: subject,
      html,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "xmail.client@gmail.com",
        pass: "xmailclient@123",
      },
    });

    const ScheduleEmail = (timerConfig) => {
      cron.schedule(
        timerConfig,
        () => {
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        },
        {
          scheduled: true,
          timezone: "Asia/Kolkata",
        }
      );
    };

    switch (option) {
      case 1:
        //immediate mailing
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) throw new Error(err);
          else {
            console.log("Email sent: " + info.response);
            res.send({ success: "Email sent!" });
          }
        });
        break;

      case 2:
        //recurring after every 30s;
        ScheduleEmail("*/5 * * * * *");
        res.send({ success: "Email scheduled for every 30s!" });
        break;

      case 3:
        //every week on particular day at particular time
        ScheduleEmail(`${mm} ${hh} * * ${day}`);
        res.send({ success: "Email scheduled for every week!" });
        break;

      case 4:
        //every month on particular date at particular time
        ScheduleEmail(`${mm} ${hh} ${dd} * *`);
        res.send({ success: "Email scheduled for every month!" });
        break;

      case 5:
        //every year on particular date at particular time
        ScheduleEmail(`${mm} ${hh} ${dd} ${m} *`);
        res.send({ success: "Email scheduled for every year!" });
        break;

      default:
        res.status(400).send({ error: "Bad request" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Something went wrong!" });
  }
});

module.exports = router;
