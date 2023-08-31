const express = require("express");

const ctrl = require("../../controllers/authControllers");
const authenticate = require("../../middleWares/authenticate");
const { validateBody, upload } = require("../../middleWares");
const { editUserSchema } = require("../../joiSchemas");

const router = express.Router();

router.get("/current", authenticate, ctrl.getCurrentUser);

router.patch(
  "/edit",
  authenticate,
  validateBody(editUserSchema),
  ctrl.editUser
);

router.patch(
  "/edit/avatar",
  authenticate,
  upload.single("avatar"),
  ctrl.changeAvatar
);

module.exports = router;
