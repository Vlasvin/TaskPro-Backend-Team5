const { HttpError } = require("../helpers");
const serv = require("../services/boardsServices");

const isCurrentUserOwner = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  const contact = await serv.getById(id);

  if (!contact.owner.equals(_id)) {
    next(HttpError(404));
  }

  next();
};

module.exports = isCurrentUserOwner;
