const { HttpError } = require("../helpers");

const isFileExist = (req, res, next) => {
  if (!req.file) {
    next(HttpError(400, ` Must add file`));
  }
  next();
};

module.exports = isFileExist;
