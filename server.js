const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const DB_HOST =
  process.env.DB_HOST ||
  "mongodb+srv://vlasvin:5s7zPfhALGRsIc8R@cluster0.bv7htjb.mongodb.net/contacts_reader?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3001;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
