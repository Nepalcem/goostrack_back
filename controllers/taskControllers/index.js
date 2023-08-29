const { ctrlWrapper } = require("../../helpers");

const addTask = require('./addTask')
const removeTaskById = require('./removeTask')

module.exports = {
  addTask: ctrlWrapper(addTask),
  removeTaskById: ctrlWrapper(removeTaskById),
};