const { Column } = require("../schemas/columnsSchemas");

const listColumns = async (owner, page, limit) => {
  const skip = (page - 1) * limit;
  return Column.find(owner).skip(skip).limit(limit);
};

const getColumnById = async (columnId) => {
  return Column.findById(columnId);
};

const removeColumn = async (columnId) => {
  return Column.findByIdAndDelete(columnId);
};

const addColumn = async (body) => {
  return Column.create(body);
};

const updateColumn = async (columnId, body) => {
  return Column.findByIdAndUpdate(columnId, body, { new: true });
};

module.exports = {
  listColumns,
  getColumnById,
  removeColumn,
  addColumn,
  updateColumn,
};
