const { Column } = require("../schemas/columnsSchemas");

const addColumn = async (body) => {
  return Column.create(body);
};

const getColumnById = async (columnId) => {
  return Column.findById(columnId);
};

const removeColumn = async (columnId) => {
  return Column.findByIdAndDelete(columnId);
};

const updateColumn = async (columnId, body) => {
  return Column.findByIdAndUpdate(columnId, { ...body }, { new: true });
};

module.exports = {
  getColumnById,
  removeColumn,
  addColumn,
  updateColumn,
};
