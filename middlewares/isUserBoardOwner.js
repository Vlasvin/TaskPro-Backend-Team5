const { HttpError } = require("../helpers");
const serv = require("../services/boardsServices");

const isUserBoardOwner = async (req, res, next) => {
  const { boardId } = req.params;
  const { _id } = req.user;
  const contact = await serv.getBoardById(boardId);

  if (!contact.owner.equals(_id)) {
    next(HttpError(404));
  }

  next();
};

module.exports = isUserBoardOwner;
