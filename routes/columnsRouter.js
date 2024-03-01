const express = require("express");

const ctrl = require("../controllers/columnsControllers");
const { schemas } = require("../schemas/columnsSchemas");
const {
  validateBody,
  isValidId,
  columnWithoutId,
  authenticate,
  isCurrentUserOwner,
} = require("../middlewares");

const columnsRouter = express.Router();

columnsRouter.get("/", authenticate, ctrl.getAllColumns);

columnsRouter.get(
  "/:id",
  isValidId,
  columnWithoutId,
  authenticate,
  isCurrentUserOwner,
  ctrl.getById
);

columnsRouter.delete(
  "/:id",
  isValidId,
  columnWithoutId,
  authenticate,
  isCurrentUserOwner,
  ctrl.deleteColumn
);

columnsRouter.post(
  "/",
  validateBody(schemas.createColumnSchema),
  authenticate,
  ctrl.createColumn
);

columnsRouter.put(
  "/:id",
  isValidId,
  columnWithoutId,
  validateBody(schemas.updateColumnSchema),
  authenticate,
  isCurrentUserOwner,
  ctrl.updateColumn
);

module.exports = columnsRouter;
