const express = require("express");
const { schemas } = require("../schemas/usersSchemas");
const {
  validateBody,
  authenticate,
  upload,
  isFileExist,
} = require("../middlewares");
const ctrl = require("../controllers/authControllers");

const router = express.Router();
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  isFileExist,
  ctrl.updateAvatar
);

module.exports = router;
