const { Todo } = require("../schemas/todosSchemas");

const addTodo = async (body) => {
  return Todo.create(body);
};

const getTodoById = async (todoId) => {
  return Todo.findById(todoId);
};

const removeTodo = async (todoId) => {
  return Todo.findByIdAndDelete(todoId);
};

const updateTodo = async (todoId, body) => {
  return Todo.findByIdAndUpdate(todoId, { ...body }, { new: true });
};

const changeColumn = async (todoId, columnId) => {
  return Todo.findByIdAndUpdate(todoId, { column: columnId }, { new: true });
};

module.exports = {
  getTodoById,
  removeTodo,
  addTodo,
  updateTodo,
  changeColumn,
};
