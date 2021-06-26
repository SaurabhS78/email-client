const mongoose = require("mongoose");

const uri =
  "mongodb+srv://xmailclient:xmailclient%40123@cluster0.znxwm.mongodb.net/testDB?retryWrites=true&w=majority";

mongoose.connect(
  uri,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
  }
);
