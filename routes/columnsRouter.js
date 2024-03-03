const express = require("express");

const ctrl = require("../controllers/columnsControllers");
const { schemas } = require("../schemas/columnsSchemas");
const {
  validateBody,
  isValidBoardId,
  isValidColumnId,
  columnWithoutId,
  authenticate,
} = require("../middlewares");

const columnsRouter = express.Router();

columnsRouter.post(
  "/:boardId",
  validateBody(schemas.createColumnSchema),
  authenticate,
  isValidBoardId,
  ctrl.createColumn
);

columnsRouter.get(
  "/:columnId",
  isValidColumnId,
  columnWithoutId,
  authenticate,
  ctrl.getById
);

columnsRouter.delete(
  "/:columnId",
  isValidColumnId,
  columnWithoutId,
  authenticate,
  ctrl.deleteColumn
);

columnsRouter.patch(
  "/:columnId",
  isValidColumnId,
  columnWithoutId,
  validateBody(schemas.updateColumnSchema),
  authenticate,
  ctrl.updateColumn
);

module.exports = columnsRouter;
