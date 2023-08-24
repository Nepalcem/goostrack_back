const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const authorizeRouter = require("./routes/api/authorization");
const tasksRouter = require("./routes/api/tasks");
const reviewsRouter = require("./routes/api/reviews");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.static("public"));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/users", authorizeRouter);
// app.use("/api-docs");
app.use("/api/tasks", tasksRouter);
app.use("/api/reviews", reviewsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
