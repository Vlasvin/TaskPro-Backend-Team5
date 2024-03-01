const serv = require("../services/columnsServices.js");
const { ctrlWrapper } = require("../helpers/index.js");

const getAllColumns = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const columns = await serv.listColumns({ owner }, page, limit);
  res.status(200).json(columns);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const column = await serv.getColumnById(id);
  res.status(200).json(column);
};

const deleteColumn = async (req, res) => {
  const { id } = req.params;
  const column = await serv.removeColumn(id);
  res.status(200).json(column);
};

const createColumn = async (req, res) => {
  const { _id: owner } = req.user;
  const column = await serv.addColumn({ ...req.body, owner });
  res.status(201).json(column);
};

const updateColumn = async (req, res) => {
  const { id } = req.params;
  const column = await serv.updateColumn(id, req.body);
  res.status(200).json(column);
};

module.exports = {
  getAllColumns: ctrlWrapper(getAllColumns),
  getById: ctrlWrapper(getById),
  deleteColumn: ctrlWrapper(deleteColumn),
  createColumn: ctrlWrapper(createColumn),
  updateColumn: ctrlWrapper(updateColumn),
};
