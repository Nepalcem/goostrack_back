const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  patchContact,
} = require("../../controllers/contactController");

const {
  validateContact,
  validateFavorite,
  validateContactId,
} = require("../../middleWares/validateContact");
const validateBody = require("../../middleWares/validateBody");
const { validateToken } = require("../../middleWares/validateToken");

router.get("/", validateToken, getContacts);
router.get("/:contactId", validateToken, validateContactId, getContactById);
router.post("/", validateToken, validateBody, validateContact, createContact);
router.delete("/:contactId", validateToken, validateContactId, deleteContact);
router.put(
  "/:contactId",
  validateToken,
  validateContactId,
  validateBody,
  validateContact,
  patchContact
);
router.patch(
  "/:contactId/favorite",
  validateToken,
  validateContactId,
  validateFavorite,
  patchContact
);

module.exports = router;
