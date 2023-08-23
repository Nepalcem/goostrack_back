const express = require("express");
const validateBody = require("../../middleWares/validateBody");
const {
  checkIfUserExist,
  validateUserFields,
} = require("../../middleWares/authorizeMiddlewares");
const {
  registrationController,
  authorizationController,
  getCurrentUser,
  logoutUser,
  updateSubscription,
} = require("../../controllers/authorizeController");
const { validateToken } = require("../../middleWares/validateToken");

const router = express.Router();

router.post(
  "/register",
  validateBody,
  validateUserFields,
  checkIfUserExist,
  registrationController
);
router.post(
  "/login",
  validateBody,
  validateUserFields,
  authorizationController
);
router.post("/logout", validateToken, logoutUser);
router.get("/current", validateToken, getCurrentUser);
router.patch("/", validateToken, validateBody, updateSubscription )

module.exports = router;
