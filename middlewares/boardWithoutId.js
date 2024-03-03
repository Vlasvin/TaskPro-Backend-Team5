const { HttpError } = require("../helpers/index.js");
const boardsServices = require("../services/boardsServices.js");

const boardWithoutId = async (req, res, next) => {
  const { boardId } = req.params;
  const todo = await boardsServices.getBoardById(boardId);

  if (!todo) {
    next(HttpError(404, "Not found"));
  }

  next();
};

module.exports = boardWithoutId;
