const { Board } = require("../schemas/boardsSchemas");

const addBoard = async (body) => {
  return Board.create(body);
};

const listBoards = async (owner) => {
  return Board.find(owner);
};

const getBoardById = async (boardId) => {
  return Board.findById(boardId);
};

const updateCurrentBoard = async (boardId, body) => {
  return Board.findByIdAndUpdate(boardId, { ...body }, { new: true });
};

module.exports = {
  listBoards,
  addBoard,
  updateCurrentBoard,
  getBoardById,
};
