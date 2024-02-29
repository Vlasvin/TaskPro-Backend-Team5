const contactWithoutId = require("./contactWithoutId");
const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const isCurrentUserOwner = require("./isCurrentUserOwner");
const isFileExist = require("./isFileExist");
const upload = require("./upload");

module.exports = {
  validateBody,
  isValidId,
  contactWithoutId,
  authenticate,
  isCurrentUserOwner,
  isFileExist,
  upload,
};
