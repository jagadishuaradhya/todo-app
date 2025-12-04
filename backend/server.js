const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const todoRoutes = require("./routes/ToDoroutes");
const userRoutes = require("./routes/UserRoutes"); // ADD THIS
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// DB connect
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected...."))
  .catch((err) => console.log(err));

// AUTH ROUTES (public)
app.use("/api/auth", userRoutes); // <-- REQUIRED

// TODO ROUTES (protected later)
app.use("/api", todoRoutes);

app.listen(PORT, () => console.log(`Listening at ${PORT}...`));
