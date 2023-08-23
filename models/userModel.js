const { Schema, model } = require("mongoose");
const Joi = require("joi");

const subscriptionEnum = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionEnum,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const authorizeSchema = Joi.object({
  password: Joi.string().required().messages({
    "any.required": "Missing required Password field",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Missing required Email field",
  }),
  subscription: Joi.string()
    .valid(...subscriptionEnum)
    .default("starter")
    .messages({
      "any.only": "Invalid subscription value",
    }),
  token: Joi.string().default(null).messages({
    "string.base": "Token must be a string",
  }),
});

module.exports = { User, authorizeSchema };
