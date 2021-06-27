const mongoose = require("mongoose");
const { DB_PASSWORD, DB_NAME } = require("../config");

const uri = `mongodb+srv://xmailclient:${DB_PASSWORD}@cluster0.znxwm.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw new Error(err);
  }
);
