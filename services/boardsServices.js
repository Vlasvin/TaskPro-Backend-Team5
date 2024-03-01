const { Board } = require("../schemas/boardsSchemas");

const listBoards = async (owner, page, limit) => {
  const skip = (page - 1) * limit;
  return Board.find(owner).skip(skip).limit(limit);
};

const getBoardById = async (boardId) => {
  return Board.findById(boardId);
};

const removeBoard = async (boardId) => {
  return Board.findByIdAndDelete(boardId);
};

const addBoard = async (body) => {
  return Board.create(body);
};

const updateBoard = async (boardId, body) => {
  return Board.findByIdAndUpdate(boardId, body, { new: true });
};

module.exports = {
  listBoards,
  getBoardById,
  removeBoard,
  addBoard,
  updateBoard,
};
