const serv = require("../services/columnsServices.js");
const { ctrlWrapper } = require("../helpers/index.js");

const { Column } = require("../schemas/columnsSchemas");
const { Todo } = require("../schemas/todosSchemas");

// const getAllColumns = async (req, res) => {
//   const { boardId: owner } = req.params;
//   const { page = 1, limit = 10 } = req.query;
//   const columns = await serv.listColumns({ owner }, page, limit);
//   res.status(200).json(columns);
// };

// const getById = async (req, res, next) => {
//   const { columnId } = req.params;
//   const column = await serv.getColumnById(columnId);
//   res.status(200).json(column);
// };

async function getById(req, res) {
  const { columnId } = req.params;
  const column = await Column.findById(columnId);
  if (!column) throw HttpError(404);
  const todos = await Todo.find({ owner: column._id });
  if (!todos) throw HttpError(404);
  res.json({
    column,
    todos,
  });
}

const deleteColumn = async (req, res) => {
  const { id } = req.params;
  const column = await serv.removeColumn(id);
  res.status(200).json(column);
};

const createColumn = async (req, res) => {
  const { boardId: owner } = req.params;
  const column = await serv.addColumn({ ...req.body, owner });
  res.status(201).json(column);
};

const updateColumn = async (req, res) => {
  const { id } = req.params;
  const column = await serv.updateColumn(id, req.body);
  res.status(200).json(column);
};

module.exports = {
  // getAllColumns: ctrlWrapper(getAllColumns),
  getById: ctrlWrapper(getById),
  deleteColumn: ctrlWrapper(deleteColumn),
  createColumn: ctrlWrapper(createColumn),
  updateColumn: ctrlWrapper(updateColumn),
};
