const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/auth.js");
const todosRouter = require("./routes/todosRouter.js");
const boardsRouter = require("./routes/boardsRouter.js");
const columnsRouter = require("./routes/columnsRouter.js");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/todos", todosRouter);
app.use("/api/boards", boardsRouter);
app.use("/api/columns", columnsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
