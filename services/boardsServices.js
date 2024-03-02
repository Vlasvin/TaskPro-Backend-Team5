const { Board } = require("../schemas/boardsSchemas");

const listBoards = async (owner, page, limit) => {
  const skip = (page - 1) * limit;
  return Board.find(owner).skip(skip).limit(limit);
};

const addBoard = async (body) => {
  return Board.create(body);
};

const updateBoard = async (boardId, body) => {
  return Board.findByIdAndUpdate(boardId, body, { new: true });
};
const updateCurrentBoard = async (boardId, body) => {
  return Board.findByIdAndUpdate(boardId, { ...body }, { new: true });
};

module.exports = {
  listBoards,
  addBoard,
  updateBoard,
  updateCurrentBoard,
};
