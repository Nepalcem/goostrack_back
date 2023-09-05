const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const {
  emailRegexp,
  birthdayRegexp,
  phoneRegexp,
} = require("../constants/regularExpressions");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      maxlength: 16,
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
    birthday: {
      type: Date,
      match: birthdayRegexp,
      default: null,
    },
    skype: {
      type: String,
      maxlength: 16,
      default: null,
    },
    phone: {
      type: String,
      match: phoneRegexp,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);
const User = model("user", userSchema);

module.exports = User;
