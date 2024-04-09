const serv = require("../services/columnsServices.js");
const { ctrlWrapper } = require("../helpers/index.js");
const { Todo } = require("../schemas/todosSchemas");

const createColumn = async (req, res) => {
  const { boardId: board } = req.params;
  const column = await serv.addColumn({ ...req.body, board });
  res.status(201).json(column);
};

const getById = async (req, res) => {
  const { columnId } = req.params;
  const column = await serv.getColumnById(columnId);
  const todos = await Todo.find({ column: column._id });
  res.status(200).json({
    column,
    todos,
  });
};

const deleteColumn = async (req, res) => {
  const { columnId } = req.params;
  const deletedColumn = await serv.removeColumn(columnId);
  const todos = await Todo.find({ column: columnId });
  if (!todos)
    res.status(200).json({
      deletedColumn,
    });
  const deletedTodos = await Todo.deleteMany({ column: columnId });
  res.status(200).json({
    deletedColumn,
    deletedTodos,
  });
};

const updateColumn = async (req, res) => {
  const { columnId } = req.params;
  const column = await serv.updateColumn(columnId, req.body);
  res.status(200).json(column);
};

module.exports = {
  getById: ctrlWrapper(getById),
  deleteColumn: ctrlWrapper(deleteColumn),
  createColumn: ctrlWrapper(createColumn),
  updateColumn: ctrlWrapper(updateColumn),
};
