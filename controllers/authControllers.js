const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

require("dotenv").config();

const serv = require("../services/boardsServices");
const { User } = require("../schemas/usersSchemas");
const { ctrlWrapper, HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const emailHash = crypto.createHash("md5").update(email).digest("hex");
  const avatarURL = gravatar.url(emailHash);

  const newUser = await User.create({
    ...req.body,
    password: passwordHash,
    avatarURL,
  });

  const payload = { id: newUser._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    user: {
      email: newUser.email,
      name: newUser.name,
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
      theme: user.theme,
    },
  });
};

const getCurrent = async (req, res) => {
  const { _id: userId } = req.user;

  const user = await User.findById(userId);

  const boards = await serv.listBoards({ owner: userId });
  res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
      theme: user.theme,
    },
    boards: boards.map((board) => ({
      id: board._id,
      title: board.title,
      background: board.backgroundURL,
    })),
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "No Content",
  });
};

const updateUser = async (req, res) => {
  const { _id } = req.user;
  if (req.file) {
    const avatarURL = req.file.path;
    await User.findByIdAndUpdate(_id, { avatarURL });
  }

  const updateFields = req.body;
  const { password } = req.body;

  if (password) {
    const passwordHash = await bcrypt.hash(password, 10);
    updateFields.password = passwordHash;
  }

  const updatedUser = await User.findByIdAndUpdate(_id, updateFields, {
    new: true,
  });

  res.json({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      avatarURL: updatedUser.avatarURL,
    },
  });
};

const updateTheme = async (req, res) => {
  const { _id } = req.user;
  const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  res.json({
    theme: updatedUser.theme,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUser: ctrlWrapper(updateUser),
  updateTheme: ctrlWrapper(updateTheme),
};
