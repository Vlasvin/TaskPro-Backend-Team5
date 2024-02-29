const express = require("express");
const ctrl = require("../controllers/contactsControllers");
const { schemas } = require("../schemas/contactsSchemas");
const {
  validateBody,
  isValidId,
  contactWithoutId,
  authenticate,
  isCurrentUserOwner,
} = require("../middlewares");

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, ctrl.getAllContacts);

contactsRouter.get(
  "/:id",
  isValidId,
  contactWithoutId,
  authenticate,
  isCurrentUserOwner,
  ctrl.getById
);

contactsRouter.delete(
  "/:id",
  isValidId,
  contactWithoutId,
  authenticate,
  isCurrentUserOwner,
  ctrl.deleteContact
);

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  authenticate,
  ctrl.createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  contactWithoutId,
  validateBody(schemas.updateContactSchema),
  authenticate,
  isCurrentUserOwner,
  ctrl.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  contactWithoutId,
  validateBody(schemas.updateFavoriteSchema),
  authenticate,
  isCurrentUserOwner,
  ctrl.updateFavorite
);

module.exports = contactsRouter;
