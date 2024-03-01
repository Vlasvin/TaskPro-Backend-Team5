const { HttpError } = require("../helpers/index.js");
const boardsService = require("../services/boardsServices.js");

const boardWithoutId = async (req, res, next) => {
  const { id } = req.params;
  const todo = await boardsService.getBoardById(id);

  if (!todo) {
    next(HttpError(404, "Not found"));
  }

  next();
};

module.exports = boardWithoutId;
