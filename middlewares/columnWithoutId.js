const { HttpError } = require("../helpers/index.js");
const columnsServices = require("../services/columnsServices.js");

const columnWithoutId = async (req, res, next) => {
  const { columnId } = req.params;
  const todo = await columnsServices.getColumnById(columnId);

  if (!todo) {
    next(HttpError(404, "Not found"));
  }

  next();
};

module.exports = columnWithoutId;
