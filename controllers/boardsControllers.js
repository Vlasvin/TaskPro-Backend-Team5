const serv = require("../services/boardsServices.js");
const { ctrlWrapper } = require("../helpers/index.js");

const getAllBoards = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const boards = await serv.listBoards({ owner }, page, limit);
  res.status(200).json(boards);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const board = await serv.getBoardById(id);
  res.status(200).json(board);
};

const deleteBoard = async (req, res) => {
  const { id } = req.params;
  const board = await serv.removeBoard(id);
  res.status(200).json(board);
};

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

module.exports = {
  getAllBoards: ctrlWrapper(getAllBoards),
  getById: ctrlWrapper(getById),
  deleteBoard: ctrlWrapper(deleteBoard),
  createBoard: ctrlWrapper(createBoard),
  updateBoard: ctrlWrapper(updateBoard),
};
