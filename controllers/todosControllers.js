const serv = require("../services/todosServices.js");
const { ctrlWrapper, HttpError } = require("../helpers/index.js");

const getAllTodos = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, priority } = req.query;
  const todos = await serv.listTodos({ owner }, page, limit, priority);
  res.status(200).json(todos);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const todo = await serv.getTodoById(id);
  res.status(200).json(todo);
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await serv.removeTodo(id);
  res.status(200).json(todo);
};

const createTodo = async (req, res) => {
  const { _id: owner } = req.user;
  const todo = await serv.addTodo({ ...req.body, owner });
  res.status(201).json(todo);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await serv.updateTodo(id, req.body);
  res.status(200).json(todo);
};

const updateCompleted = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  if (completed === undefined) {
    throw HttpError(400, "missing field completed");
  }
  const todo = await serv.updateStatusTodo(id, req.body);
  res.status(200).json(todo);
};

module.exports = {
  getAllTodos: ctrlWrapper(getAllTodos),
  getById: ctrlWrapper(getById),
  deleteTodo: ctrlWrapper(deleteTodo),
  createTodo: ctrlWrapper(createTodo),
  updateTodo: ctrlWrapper(updateTodo),
  updateCompleted: ctrlWrapper(updateCompleted),
};
