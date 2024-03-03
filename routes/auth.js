const express = require("express");
const { schemas } = require("../schemas/usersSchemas");
const {
  validateBody,
  authenticate,
  upload
} = require("../middlewares");
const ctrl = require("../controllers/authControllers");
const ctr = require("../controllers/authGoogle");

const router = express.Router();
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSchema),
  upload.single("avatar"),
  ctrl.updateUser
);

router.get("/google", ctr.googleAuth);
router.get("/google-redirect", ctr.googleRedirect);

module.exports = router;
