const express = require("express");

const ctrl = require("../controllers/boardsControllers");
const { schemas } = require("../schemas/boardsSchemas");
const {
  validateBody,
  isValidBoardId,
  boardWithoutId,
  authenticate,
  isUserBoardOwner,
} = require("../middlewares");

const boardsRouter = express.Router();

boardsRouter.post(
  "/",
  validateBody(schemas.createBoardSchema),
  authenticate,
  ctrl.createBoard
);

boardsRouter.get("/", authenticate, ctrl.getAllBoards);

boardsRouter.get(
  "/:boardId",
  isValidBoardId,
  boardWithoutId,
  authenticate,
  isUserBoardOwner,
  ctrl.getById
);

boardsRouter.delete(
  "/:boardId",
  isValidBoardId,
  boardWithoutId,
  authenticate,
  isUserBoardOwner,
  ctrl.deleteBoard
);

boardsRouter.patch(
  "/:boardId",
  isValidBoardId,
  boardWithoutId,
  validateBody(schemas.updateBoardSchema),
  authenticate,
  isUserBoardOwner,
  ctrl.updateCurrentBoard
);

module.exports = boardsRouter;
