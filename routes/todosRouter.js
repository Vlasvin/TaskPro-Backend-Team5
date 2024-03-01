const express = require("express");

const ctrl = require("../controllers/todosControllers");
const { schemas } = require("../schemas/todosSchemas");
const {
  validateBody,
  isValidId,
  todoWithoutId,
  authenticate,
  isCurrentUserOwner,
} = require("../middlewares");

const todosRouter = express.Router();

todosRouter.get("/", authenticate, ctrl.getAllTodos);

todosRouter.get(
  "/:id",
  isValidId,
  todoWithoutId,
  authenticate,
  isCurrentUserOwner,
  ctrl.getById
);

todosRouter.delete(
  "/:id",
  isValidId,
  todoWithoutId,
  authenticate,
  isCurrentUserOwner,
  ctrl.deleteTodo
);

todosRouter.post(
  "/",
  validateBody(schemas.createTodoSchema),
  authenticate,
  ctrl.createTodo
);

todosRouter.put(
  "/:id",
  isValidId,
  todoWithoutId,
  validateBody(schemas.updateTodoSchema),
  authenticate,
  isCurrentUserOwner,
  ctrl.updateTodo
);

todosRouter.patch(
  "/:id/completed",
  isValidId,
  todoWithoutId,
  validateBody(schemas.updateCompletedSchema),
  authenticate,
  isCurrentUserOwner,
  ctrl.updateCompleted
);

module.exports = todosRouter;
