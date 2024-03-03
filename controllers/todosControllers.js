const serv = require("../services/todosServices.js");
const { ctrlWrapper } = require("../helpers/index.js");
const { Todo } = require("../schemas/todosSchemas");

const createTodo = async (req, res) => {
  const { columnId: column } = req.params;
  const todo = await serv.addTodo({ ...req.body, column });
  res.status(201).json(todo);
};

const getById = async (req, res) => {
  const { todoId } = req.params;
  const todo = await serv.getTodoById(todoId);
  res.status(200).json(todo);
};

const deleteTodo = async (req, res) => {
  const { todoId } = req.params;
  const todo = await serv.removeTodo(todoId);
  res.status(200).json(todo);
};

const updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const todo = await serv.updateTodo(todoId, req.body);
  res.status(200).json(todo);
};
const changeColumn = async (req, res) => {
  const { todoId, columnId } = req.params;
  const todo = await serv.changeColumn(todoId, columnId);
  res.status(200).json(todo);
};

module.exports = {
  getById: ctrlWrapper(getById),
  deleteTodo: ctrlWrapper(deleteTodo),
  createTodo: ctrlWrapper(createTodo),
  updateTodo: ctrlWrapper(updateTodo),
  changeColumn: ctrlWrapper(changeColumn),
};
