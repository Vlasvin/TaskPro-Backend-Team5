const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../schemas/usersSchemas");
const { ctrlWrapper } = require("../helpers");

const googleAuth = async (req, res) => {
  const queryString = await import("query-string");
  const stringifiedParams = queryString.default.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/users/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

const googleRedirect = async (req, res) => {
  const queryString = await import("query-string");
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.default.parse(urlObj.search);
  const code = urlParams.code;
  console.log(fullUrl);

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/users/google-redirect`,
      grant_type: "authorization_code",
      code: code,
    },
  });
  console.log(tokenData);
  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  let user = await User.findOne({ email: userData.data.email });
  if (!user) {
    const password = bcrypt.hashSync(userData.data.email, 10);
    user = await User.create({
      email: userData.data.email,
      name: userData.data.name,
      avatarURL: userData.data.picture,
      password,
    });
  }

  const payload = { id: user._id };
  const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  console.log(payload);
  const refreshToken = jwt.sign({}, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  await User.findByIdAndUpdate(user._id, { token: accessToken, refreshToken });
  return res.redirect(
    `${process.env.FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`
  );
};
// <a href="https://localhost:3001/api/users/google">
// click auth GOOGLE
// </a>

module.exports = {
  googleAuth: ctrlWrapper(googleAuth),
  googleRedirect: ctrlWrapper(googleRedirect),
};
