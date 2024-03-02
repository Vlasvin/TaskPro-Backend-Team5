const { HttpError } = require("../helpers/index.js");
const todosService = require("../services/todosServices.js");

const todoWithoutId = async (req, res, next) => {
  const { id } = req.params;
  const todo = await todosService.getTodoById(id);

  if (!todo) {
    next(HttpError(404, "Not found"));
  }

  next();
};

module.exports = todoWithoutId;
