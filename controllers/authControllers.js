const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const crypto = require("crypto");
const Jimp = require("jimp");

const { User } = require("../schemas/usersSchemas");
const { ctrlWrapper, HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

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
      email: user.email,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email } = req.user;
  res.status(200).json({
    email,
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
    const { path: tempUpload, originalname } = req.file;

    const image = await Jimp.read(tempUpload);
    await image.resize(250, 250).write(tempUpload);

    const filename = `${_id}_${originalname}`;
    const newUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, newUpload);
    const avatarURL = path.join("avatars", filename);
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

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUser: ctrlWrapper(updateUser),
};
