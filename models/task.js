const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");


const { dateRegexp, timeRegexp } = require("../constants/regularExpressions");
const { priorityEnum, taskStatusEnum } = require("../constants/enumArrays");

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
      required: true,
      match: timeRegexp,
      validate: {
        validator: function (value) {
          return value >= this.start;
        },
        message:
          "Please set end time of the task, it should be later than start time",
      },
    },
    date: {
      type: String,
      required: true,
      match: dateRegexp,
    },
    priority: {
      type: String,
      enum: priorityEnum,
      default: "low",
      trim: true,
      required: true,
    },
    category: {
      type: String,
      enum: taskStatusEnum,
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
