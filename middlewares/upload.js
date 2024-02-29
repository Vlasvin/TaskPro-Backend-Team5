const multer = require("multer");
const path = require("path");
const { HttpError } = require("../helpers");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
});

const multerFilter = (req, file, cd) => {
  if (file.mimetype.startsWith("image/")) {
    cd(null, true);
  } else {
    cd(HttpError(400, "Please upload images only"));
  }
};

const upload = multer({
  storage: multerConfig,
  fileFilter: multerFilter,
});

module.exports = upload;
