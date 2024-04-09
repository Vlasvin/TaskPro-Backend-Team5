const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidTodoId = (req, res, next) => {
  const { todoId } = req.params;
  if (!isValidObjectId(todoId)) {
    next(HttpError(400, `${todoId} is not valid id`));
  }
  next();
};

module.exports = isValidTodoId;
