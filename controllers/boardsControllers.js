const serv = require("../services/boardsServices.js");
const { ctrlWrapper } = require("../helpers/index.js");
const { Board } = require("../schemas/boardsSchemas");
const { Column } = require("../schemas/columnsSchemas");
const { Todo } = require("../schemas/todosSchemas");

const createBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const board = await serv.addBoard({ ...req.body, owner });
  res.status(201).json(board);
};

const getAllBoards = async (req, res) => {
  const { _id: owner } = req.user;
  const boards = await serv.listBoards({ owner });
  res.status(200).json(boards);
};

const getById = async (req, res) => {
  const { boardId } = req.params;
  const board = await Board.findById(boardId);
  const columns = await Column.find({ board: board._id });
  if (columns.length > 0) {
    const columnsWithOwnCards = await Column.aggregate([
      {
        $match: { $or: columns },
      },
      {
        $lookup: {
          from: "todos",
          localField: "_id",
          foreignField: "column",
          as: "todos",
        },
      },
    ]);
    if (!board) throw HttpError(404);

    res.json({
      board,
      columns: columnsWithOwnCards,
    });
  }
  res.json({
    board,
    columns: [],
  });
};

const deleteBoard = async (req, res) => {
  const { boardId } = req.params;
  const deletedBoard = await Board.findByIdAndDelete(boardId);
  const columns = await Column.find({ board: boardId });
  const deletedColumn = await Column.deleteMany({ board: boardId });
  const ArrayColumnsIds = columns.map((column) => column._id);
  const deletedTodo = await Todo.deleteMany({ column: ArrayColumnsIds });
  if (!deletedBoard || !deletedColumn || !deletedTodo || !columns)
    throw HttpError(404);
  res.json({
    deletedBoard,
    deletedColumn,
    deletedTodo,
  });
};

const updateCurrentBoard = async (req, res) => {
  const { boardId } = req.params;
  const board = await serv.updateCurrentBoard(boardId, req.body);
  res.status(200).json(board);
};

module.exports = {
  getAllBoards: ctrlWrapper(getAllBoards),
  getById: ctrlWrapper(getById),
  deleteBoard: ctrlWrapper(deleteBoard),
  createBoard: ctrlWrapper(createBoard),
  updateCurrentBoard: ctrlWrapper(updateCurrentBoard),
};
