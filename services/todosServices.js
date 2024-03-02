const { Todo } = require("../schemas/todosSchemas");

// const listTodos = async (owner, page, limit, priority) => {
//   const skip = (page - 1) * limit;

//   if (priority) {
//     owner.priority = priority;
//   }
//   return Todo.find(owner).skip(skip).limit(limit);
// };

const getTodoById = async (todoId) => {
  console.log(todoId);
  return Todo.findById(todoId);
};

const removeTodo = async (todoId) => {
  return Todo.findByIdAndDelete(todoId);
};

const addTodo = async (body) => {
  return Todo.create(body);
};

const updateTodo = async (todoId, body) => {
  return Todo.findByIdAndUpdate(todoId, body, { new: true });
};

// const changeColumnTodo = async (todoId, owner) => {
//   return Todo.findByIdAndUpdate(todoId, owner, { new: true });
// };

module.exports = {
  // listTodos,
  getTodoById,
  removeTodo,
  addTodo,
  updateTodo,
  // changeColumnTodo,
};
