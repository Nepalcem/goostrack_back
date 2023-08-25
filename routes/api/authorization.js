const express = require("express");

const { validateBody } = require("../../middleWares");
const {
  registerSchema,
  verificationSchema,
  loginSchema,
} = require("../../joiSchemas");

const ctrl = require("../../controllers/authorizeController");

const router = express.Router();

router.post("/register", validateBody(registerSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  validateBody(verificationSchema),
  ctrl.resendVerifyEmail
);

router.post("/login", validateBody(loginSchema), ctrl.login);

// router.post("/logout", );
// router.get("/current", );
// avatar change

module.exports = router;
