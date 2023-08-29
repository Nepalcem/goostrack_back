const express = require("express");

const {
  addTask, removeTaskById,updateTask,getAllTasks,
  } = require("../../controllers/taskControllers");
const { schemaAddTask } = require("../../joiSchemas");
const { validateBody, sValidId } = require("../../middleWares");
const authenticate = require('../../middleWares/authenticate');

const router = express.Router();

router.post("/", authenticate, validateBody(schemaAddTask), addTask);
router.get("/", authenticate, getAllTasks);
router.patch("/:id", authenticate, validateBody(schemaAddTask), updateTask), 
router.delete("/:id", authenticate, removeTaskById);


module.exports = router;

