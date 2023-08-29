const { HttpError } = require("../../helpers");
const { Task } = require("../../models");

const removeTaskById = async (req, res, next) => {
  const { id } = req.params;
  const owner = req.user?._id;

  if (!owner) {
    throw HttpError(400, "Missing owner");
  }

  const result = await Task.findByIdAndDelete({ _id: id, owner });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({ message: "Task successfully deleted" });
};

module.exports = removeTaskById;
