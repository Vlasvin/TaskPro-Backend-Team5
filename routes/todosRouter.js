const express = require("express");

const ctrl = require("../controllers/todosControllers");
const { schemas } = require("../schemas/todosSchemas");
const {
  validateBody,
  isValidId,
  todoWithoutId,
  authenticate,
  // isCurrentUserOwner,
} = require("../middlewares");

const todosRouter = express.Router();

todosRouter.get(
  "/:id",

  authenticate,

  ctrl.getById
);

todosRouter.delete(
  "/:id",
  isValidId,
  todoWithoutId,
  authenticate,
  // isCurrentUserOwner,
  ctrl.deleteTodo
);

todosRouter.post(
  "/:columnId",
  validateBody(schemas.createTodoSchema),
  authenticate,
  ctrl.createTodo
);

todosRouter.put(
  "/:todoId",
  isValidId,
  todoWithoutId,
  validateBody(schemas.updateTodoSchema),
  authenticate,
  // isCurrentUserOwner,
  ctrl.updateTodo
);

todosRouter.patch(
  "/:cardId/owner/:columnId",

  authenticate,
  // isCurrentUserOwner,
  ctrl.changeColumn
);

module.exports = todosRouter;
