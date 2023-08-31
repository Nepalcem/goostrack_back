const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "environment", ".env") });

const authRouter = require("./routes/api/authRouter");
const usersRouter = require("./routes/api/usersRouter");
const tasksRouter = require("./routes/api/tasksRouter");

const reviewsRouter = require("./routes/api/reviewsRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", usersRouter);

// app.use("/api-docs");
app.use("/api/tasks", tasksRouter);
app.use("/api/reviews", reviewsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
