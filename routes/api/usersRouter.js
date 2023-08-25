const express = require("express");

const ctrl = require("../../controllers/authControllers");
const authenticate = require("../../middleWares/authenticate");

const router = express.Router();

router.get("/current", authenticate, ctrl.getCurrentUser);

// avatar change

module.exports = router;
