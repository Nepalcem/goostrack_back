const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const timeRegexp = /^([0-9]{2})\:([0-9]{2})$/;
const dateRegexp = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      default: "Title",
      required: [true, "Please add title of task"],
    },
    start: {
      type: String,
      default: "09:00",
      required: [true, "Please set start time of task"],
      match: timeRegexp,
    },
    end: {
      type: String,
      default: "09:30",
      required: [true, "Please set end time of task"],
      match: timeRegexp,
    },
    date: {
      type: String,
      required: true,
      match: dateRegexp,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
      trim: true,
      required: true,
    },
    category: {
      type: String,
      enum: ["to-do", "in-progress", "done"],
      default: "to-do",
      trim: true,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

taskSchema.post("save", handleMongooseError);

const Task = model("task", taskSchema);

module.exports = Task;
