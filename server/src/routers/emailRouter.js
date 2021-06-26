const express = require("express");
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const mongoose = require('mongoose');

const router = express.Router();

const Email = require("../models/Email");

const sendMailCallback = (mailOptions) => {
    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err);
        }else{
            console.log('Email sent: ' + info.response);
        }
    });
}

router.post('/email/compose', (req, res) => {
    //data from front end here.
    const { to, subject, text, option, day, date, time } = req.body;
    const hh = time.slice(0, 2);
    const mm = time.slice(3);
    const m = date.slice(5, 7);
    const dd = date.slice(8);
    // email schema instance created
    const email = new Email(req.body);

    const mailOptions = {
        from : from,
        to: to,
        cc : cc,
        Subject: subject,
        text: text,
    };

    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'xmail.client@gmail.com',
            pass : 'xmailclient%40123'
        }
    });

    if(option == 1){ //immediate mailing
        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                console.log(err);
            }else{
                console.log('Email sent: ' + info.response);
            }
        });
    }else if(option == 2){ //recurring after every 30s;
        cron.schedule('*/30 * * * * *', sendMailCallback(mailOptions), {
            scheduled : true,
            timezone : "Asia/Kolkata"
        });
    }else if(option == 3){ //every week on particular day at particular time
        cron.schedule('mm hh * * day', sendMailCallback(mailOptions), {
            scheduled : true,
            timezone : "Asia/Kolkata"
        });
    }else if(option == 4){ //every month on particular date at particular time
        cron.schedule('${mm} hh dd * *', sendMailCallback(mailOptions), {
            scheduled : true,
            timezone : "Asia/Kolkata"
        });
    }else if(option == 5){ //every year on particular date at particular time
        cron.schedule('mm hh dd m *', sendMailCallback(mailOptions), {
            scheduled : true,
            timezone : "Asia/Kolkata"
        });
    }
    //redirect page to home page
    res.redirect('/compose');
})

module.exports = router;