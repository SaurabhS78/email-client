const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    to : {
        type: String,
        required : true
    },
    cc : String,
    subject : String,
    html : String,
    option : {
        type : Number,
        required : true
    },
    day : {
        type : Number,
        default : 1
    },
    date : {
        type : Date,
        default : Date.now.slice(0, 11)
    },
    time : {
        type: String,
        default : "00:00"
    }
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;