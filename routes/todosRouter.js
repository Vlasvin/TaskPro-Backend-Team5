const express = require("express");

const ctrl = require("../controllers/todosControllers");
const { schemas } = require("../schemas/todosSchemas");
const {
  validateBody,
  isValidTodoId,
  isValidColumnId,
  todoWithoutId,
  authenticate,
} = require("../middlewares");

const todosRouter = express.Router();

todosRouter.post(
  "/:columnId",
  isValidColumnId,
  validateBody(schemas.createTodoSchema),
  authenticate,
  ctrl.createTodo
);

todosRouter.get(
  "/:todoId",
  isValidTodoId,
  todoWithoutId,
  authenticate,
  ctrl.getById
);

todosRouter.delete(
  "/:todoId",
  isValidTodoId,
  todoWithoutId,
  authenticate,
  ctrl.deleteTodo
);

todosRouter.patch(
  "/:todoId",
  isValidTodoId,
  todoWithoutId,
  validateBody(schemas.updateTodoSchema),
  authenticate,
  ctrl.updateTodo
);

todosRouter.patch(
  "/:todoId/owner/:columnId",
  isValidColumnId,
  isValidTodoId,
  authenticate,
  ctrl.changeColumn
);

module.exports = todosRouter;
