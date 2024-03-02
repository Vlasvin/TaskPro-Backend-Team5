const { HttpError } = require("../helpers/index.js");
const columnsServices = require("../services/columnsServices.js");

const columnWithoutId = async (req, res, next) => {
  const { id } = req.params;
  const todo = await columnsServices.getColumnById(id);

  if (!todo) {
    next(HttpError(404, "Not found"));
  }

  next();
};

module.exports = columnWithoutId;
