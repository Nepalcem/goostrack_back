const express = require("express");

const {
  addTask, removeTaskById,updateTask,
  } = require("../../controllers/taskControllers");
const { schemaAddTask } = require("../../joiSchemas");
const { validateBody } = require("../../middleWares");
const authenticate = require('../../middleWares/authenticate')
// const { isValid } = require("../../helpers");

const router = express.Router();

router.post("/", authenticate, validateBody(schemaAddTask), addTask);
router.patch("/:id", authenticate, validateBody(schemaAddTask), updateTask), 
router.delete("/:id", authenticate, removeTaskById);


module.exports = router;

