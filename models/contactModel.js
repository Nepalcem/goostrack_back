const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: [true, "Duplicated email.."],
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Contact = mongoose.model("Contact", contactSchema);

const schema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Missing required Name field",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Missing required Email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "Missing required Phone field",
  }),
  favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {Contact, schema, favoriteSchema};
