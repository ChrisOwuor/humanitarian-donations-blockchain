const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes/router");
const config = require("./config");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

mongoose
  .connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Welcome to the Red Cross Blockchain Project API!");
});

// Error handling middleware (optional)
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
