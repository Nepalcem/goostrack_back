const { ctrlWrapper } = require("../../helpers");

const addTask = require('./addTask')
const removeTaskById = require('./removeTask')
const updateTask = require('./updateTask')

module.exports = {
  addTask: ctrlWrapper(addTask),
  removeTaskById: ctrlWrapper(removeTaskById),
  updateTask: ctrlWrapper(updateTask),
};