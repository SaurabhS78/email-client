const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SIGNATURE } = require("../config");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Email is invalid");
    },
  },
  isOauth: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: !this.isOauth,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//Create Auth Tokens
userSchema.methods.getAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, JWT_SIGNATURE);
  this.tokens = { token };
  await this.save();

  return token;
};

//Find users by credentials
userSchema.statics.findByCreds = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Unable to find user");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Unable to find user");

  return user;
};

// Hash passwords
userSchema.pre("save", async function (next) {
  if (this.isModified("password") && !this.isOauth) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
