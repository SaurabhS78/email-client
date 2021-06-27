const nodemailer = require("nodemailer");
const cron = require("node-cron");
const { MAILER_PASSWORD, MAILER_ID } = require("../config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAILER_ID,
    pass: MAILER_PASSWORD,
  },
});

const ScheduleEmail = (email) => {
  console.log("outside");
  const mailOptions = {
    to: email.to,
    cc: email.cc,
    subject: email.subject,
    html: email.html,
  };

  try {
    cron.schedule(
      email.cronExpression,
      () => {
        console.log("incron");
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) throw new Error(err);
          console.log("Email sent: " + info.response);
          email.history = [...email.history, info.response];
          email.save();
        });
      },
      {
        scheduled: true,
        timezone: "Asia/Kolkata",
      }
    );
  } catch (e) {
    console.log(e);
  }
};

module.exports = { transporter, ScheduleEmail };
