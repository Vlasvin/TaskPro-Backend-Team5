const serv = require("../services/contactsServices.js");
const { ctrlWrapper, HttpError } = require("../helpers");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const contacts = await serv.listContacts({ owner }, page, limit, favorite);
  res.status(200).json(contacts);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await serv.getContactById(id);
  res.status(200).json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await serv.removeContact(id);
  res.status(200).json(contact);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const contact = await serv.addContact({ ...req.body, owner });
  res.status(201).json(contact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const contact = await serv.updateStatusContact(id, req.body);
  res.status(200).json(contact);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  if (favorite === undefined) {
    throw HttpError(400, "missing field favorite");
  }
  const contact = await serv.updateContact(id, req.body);
  res.status(200).json(contact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
