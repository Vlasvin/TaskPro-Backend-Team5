const serv = require("../services/boardsServices.js");
const { ctrlWrapper } = require("../helpers/index.js");
const { Board } = require("../schemas/boardsSchemas");
const { Column } = require("../schemas/columnsSchemas");
const { Todo } = require("../schemas/todosSchemas");

const getAllBoards = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const boards = await serv.listBoards({ owner }, page, limit);
  res.status(200).json(boards);
};

async function getById(req, res) {
  const { boardId } = req.params;
  const board = await Board.findById(boardId);
  const columns = await Column.find({ owner: board._id });

  if (columns.length > 0) {
    const columnsWithOwnCards = await Column.aggregate([
      {
        $match: { $or: columns },
      },
      {
        $lookup: {
          from: "cards",
          localField: "_id",
          foreignField: "owner",
          as: "cards",
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
}

async function deleteBoard(req, res) {
  const { boardId } = req.params;
  const deletedBoard = await Board.findByIdAndRemove(boardId);
  const columns = await Column.find({ owner: boardId });
  const deletedColumn = await Column.deleteMany({ owner: boardId });
  const ArrayColumnsIds = columns.map((column) => column._id);
  const deletedTodo = await Todo.deleteMany({ owner: ArrayColumnsIds });
  if (!deletedBoard || !deletedColumn || !deletedTodo || !columns)
    throw HttpError(404);
  res.json({
    deletedBoard,
    deletedColumn,
    deletedTodo,
  });
}

const createBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const board = await serv.addBoard({ ...req.body, owner });
  res.status(201).json(board);
};

const updateBoard = async (req, res) => {
  const { id } = req.params;
  const board = await serv.updateBoard(id, req.body);
  res.status(200).json(board);
};
const updateCurrentBoard = async (req, res) => {
  const { id } = req.params;
  const board = await serv.updateCurrentBoard(id, req.body);
  res.status(200).json(board);
};

module.exports = {
  getAllBoards: ctrlWrapper(getAllBoards),
  getById: ctrlWrapper(getById),
  deleteBoard: ctrlWrapper(deleteBoard),
  createBoard: ctrlWrapper(createBoard),
  updateBoard: ctrlWrapper(updateBoard),
  updateCurrentBoard: ctrlWrapper(updateCurrentBoard),
};
