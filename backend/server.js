const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const todoRoutes = require("./routes/ToDoroutes");
const userRoutes = require("./routes/UserRoutes");
const auth = require("./auth"); // <--- use your auth.js

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// DB connect
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected...."))
  .catch((err) => console.log(err));

// PUBLIC AUTH ROUTES
app.use("/api/auth", userRoutes);

// PROTECTED TODO ROUTES (need valid JWT)
app.use("/api", auth, todoRoutes);

app.listen(PORT, () => console.log(`Listening at ${PORT}...`));
