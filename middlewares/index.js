const contactWithoutId = require("./contactWithoutId");
const todoWithoutId = require("./todoWithoutId");
const boardWithoutId = require("./boardWithoutId");
const columnWithoutId = require("./columnWithoutId");
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
  columnWithoutId,
  todoWithoutId,
  boardWithoutId,
  authenticate,
  isCurrentUserOwner,
  isFileExist,
  upload,
};
