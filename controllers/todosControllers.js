const serv = require("../services/todosServices.js");
const { ctrlWrapper } = require("../helpers/index.js");
const { Todo } = require("../schemas/todosSchemas");

// const getAllTodos = async (req, res) => {
//   const { columnId: owner } = req.params;
//   const { page = 1, limit = 10, priority } = req.query;
//   const todos = await serv.listTodos({ owner }, page, limit, priority);
//   res.status(200).json(todos);
// };

const getById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const todo = await serv.getTodoById(id);
  res.status(200).json(todo);
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await serv.removeTodo(id);
  res.status(200).json(todo);
};

const createTodo = async (req, res) => {
  const { columnId: owner } = req.params;
  const todo = await serv.addTodo({ ...req.body, owner });
  res.status(201).json(todo);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await serv.updateTodo(id, req.body);
  res.status(200).json(todo);
};

// const changeColumn = async (req, res) => {
//   const { todoid, newColumnId: owner } = req.params;
//   const todo = await serv.changeColumnTodo(todoid, owner);
//   res.status(200).json(todo);
// };

async function changeColumn(req, res) {
  const { cardId, columnId } = req.params;
  const result = await Todo.findByIdAndUpdate(
    cardId,
    { owner: columnId },
    {
      new: true,
    }
  );
  if (!result) throw HttpError(404);
  res.json(result);
}

module.exports = {
  // getAllTodos: ctrlWrapper(getAllTodos),
  getById: ctrlWrapper(getById),
  deleteTodo: ctrlWrapper(deleteTodo),
  createTodo: ctrlWrapper(createTodo),
  updateTodo: ctrlWrapper(updateTodo),
  changeColumn: ctrlWrapper(changeColumn),
};
