const express = require("express");

const ctrl = require("../../controllers/authControllers");
const authenticate = require("../../middleWares/authenticate");
const { validateBody } = require("../../middleWares");
const { editUserSchema } = require("../../joiSchemas");

const router = express.Router();

router.get("/current", authenticate, ctrl.getCurrentUser);

router.patch(
  "/edit",
  authenticate,
  validateBody(editUserSchema),
  ctrl.editUser
);

// avatar change

module.exports = router;
