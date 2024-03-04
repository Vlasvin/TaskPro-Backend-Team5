const { HttpError } = require("../helpers/index.js");
const todosServices = require("../services/todosServices.js");

const todoWithoutId = async (req, res, next) => {
  const { todoId } = req.params;
  const todo = await todosServices.getTodoById(todoId);

  if (!todo) {
    next(HttpError(404, "Not found"));
  }

  next();
};

module.exports = todoWithoutId;
