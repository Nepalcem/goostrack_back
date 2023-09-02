const express = require("express");

const ctrl = require("../../controllers/authControllers");
const authenticate = require("../../middleWares/authenticate");
const { validateBody, upload, validateImage } = require("../../middleWares");
const { editUserSchema } = require("../../joiSchemas");

const router = express.Router();

router.get("/current", authenticate, ctrl.getCurrentUser);

router.patch(
  "/edit",
  authenticate,
  upload.any(),
  validateImage(),
  validateBody(editUserSchema),
  ctrl.editUser
);

module.exports = router;
