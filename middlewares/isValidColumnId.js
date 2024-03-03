const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidColumndId = (req, res, next) => {
  const { columnId } = req.params;
  if (!isValidObjectId(columnId)) {
    next(HttpError(400, `${columnId} is not valid id`));
  }
  next();
};

module.exports = isValidColumndId;
