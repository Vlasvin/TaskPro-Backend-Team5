const express = require("express");

const ctrl = require("../controllers/boardsControllers");
const { schemas } = require("../schemas/boardsSchemas");
const {
  validateBody,
  isValidId,
  boardWithoutId,
  authenticate,
  isCurrentUserOwner,
} = require("../middlewares");

const boardsRouter = express.Router();

boardsRouter.get("/", authenticate, ctrl.getAllBoards);

boardsRouter.get(
  "/:boardId",
  // isValidId,
  // boardWithoutId,
  authenticate,
  // isCurrentUserOwner,
  ctrl.getById
);

boardsRouter.delete(
  "/:boardId",
  isValidId,
  boardWithoutId,
  authenticate,
  isCurrentUserOwner,
  ctrl.deleteBoard
);

boardsRouter.post(
  "/",
  validateBody(schemas.createBoardSchema),
  authenticate,
  ctrl.createBoard
);

boardsRouter.put(
  "/:boardId",
  isValidId,
  boardWithoutId,
  validateBody(schemas.updateBoardSchema),
  authenticate,
  isCurrentUserOwner,
  ctrl.updateBoard
);

boardsRouter.patch(
  "/:boardId",
  isValidId,
  boardWithoutId,
  validateBody(schemas.updateBoardSchema),
  authenticate,
  isCurrentUserOwner,
  ctrl.updateCurrentBoard
);

module.exports = boardsRouter;
