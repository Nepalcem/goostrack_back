const express = require("express");

const { validateBody } = require("../../middleWares");
const {
  registerSchema,
  verificationSchema,
  loginSchema,
} = require("../../joiSchemas");

const ctrl = require("../../controllers/authControllers");
const authenticate = require("../../middleWares/authenticate");

const router = express.Router();

router.post("/register", validateBody(registerSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  validateBody(verificationSchema),
  ctrl.resendVerifyEmail
);

router.post("/login", validateBody(loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrentUser);

// avatar change

module.exports = router;
