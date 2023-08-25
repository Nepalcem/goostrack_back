const express = require("express");

const ctrl = require("../../controllers/authControllers");
const authenticate = require("../../middleWares/authenticate");
const { validateBody } = require("../../middleWares");
const {
  registerSchema,
  verificationSchema,
  loginSchema,
} = require("../../joiSchemas");

const router = express.Router();

router.post("/register", validateBody(registerSchema), ctrl.register);

router.post(
  "/verify",
  validateBody(verificationSchema),
  ctrl.resendVerifyEmail
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/login", validateBody(loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
