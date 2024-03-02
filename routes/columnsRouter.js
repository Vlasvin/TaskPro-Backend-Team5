const express = require("express");

const ctrl = require("../controllers/columnsControllers");
const { schemas } = require("../schemas/columnsSchemas");
const {
  validateBody,
  isValidId,
  columnWithoutId,
  authenticate,
  // isCurrentUserOwner,
} = require("../middlewares");

const columnsRouter = express.Router();

// columnsRouter.get("/:boardId", authenticate, ctrl.getAllColumns);

columnsRouter.get(
  "/:columnId",
  // isValidId,
  // columnWithoutId,
  authenticate,
  // isCurrentUserOwner,
  ctrl.getById
);

columnsRouter.delete(
  "/:columnId",
  isValidId,
  columnWithoutId,
  authenticate,
  // isCurrentUserOwner,
  ctrl.deleteColumn
);

columnsRouter.post(
  "/:boardId",
  validateBody(schemas.createColumnSchema),
  authenticate,
  ctrl.createColumn
);

columnsRouter.put(
  "/:columnId",
  isValidId,
  columnWithoutId,
  validateBody(schemas.updateColumnSchema),
  authenticate,
  // isCurrentUserOwner,
  ctrl.updateColumn
);

module.exports = columnsRouter;
