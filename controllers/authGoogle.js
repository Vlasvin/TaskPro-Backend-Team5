const axios = require("axios");
const { ctrlWrapper } = require("../helpers");

googleAuth = async (req, res) => {
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

googleRedirect = async (req, res) => {
  const queryString = await import("query-string");
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.default.parse(urlObj.search);
  const code = urlParams.code;

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

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  //тут повинна бути логіка обробки юзера, якщо такого email немає в базі, створюємо нового користувача. Також створюємо accessToken. Перевіряв роботу додавши на любий фронт такий лінк   <a href="http://localhost:3001/api/users/google">GOOGLE</a> Думаю класно було б зробити, щоб фото з userData.picture зберігалось як аватар нашого юзера, якщо воно є

  return res.redirect(
    `${process.env.FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`
  );
};

module.exports = {
  googleAuth: ctrlWrapper(googleAuth),
  googleRedirect: ctrlWrapper(googleRedirect),
};
