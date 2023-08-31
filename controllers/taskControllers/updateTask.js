const { HttpError } = require("../../helpers");
const { Task } = require("../../models");

const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const owner = req.user?._id;
  const body = req.body;
  const { title, start, end, priority, date, category } = req.body;

  if (!owner) {
    throw HttpError(400, "Missing owner");
  }

  if (!body) {
    throw HttpError(400, "Missing body of request");
  }

  if (!title || !start || !end || !priority || !date || !category) {
    throw HttpError(400, "Missing fields of request");
  }

  if (start >= end) {
    throw HttpError(400, "End should be greater then Start time");
  }

  const result = await Task.findByIdAndUpdate({ _id: id, owner }, body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found for update");
  }
  res.status(200).json({
    message: "Task successfully updated",
    result,
  });
};

module.exports = updateTask;
