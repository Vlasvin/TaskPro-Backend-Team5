const { Contact } = require("../schemas/contactsSchemas");

const listContacts = async (owner, page, limit, favorite) => {
  const skip = (page - 1) * limit;

  if (favorite) {
    owner.favorite = favorite;
  }
  return Contact.find(owner).skip(skip).limit(limit);
};

const getContactById = async (contactId) => {
  return Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};

const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
};

const addContact = async (body) => {
  return Contact.create(body);
};

const updateStatusContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
