const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema(
  {
    toDo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Returns a Mongoose model for today's date-based collection
function getTodayTodoModel() {
  const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'
  const safeDate = today.replace(/-/g, "_"); // 'YYYY_MM_DD'

  const modelName = `ToDO_${safeDate}`;
  const collectionName = `todo_${safeDate}`;

  // Reuse model if already created
  if (mongoose.models[modelName]) {
    return mongoose.models[modelName];
  }

  return mongoose.model(modelName, toDoSchema, collectionName);
}

module.exports = getTodayTodoModel;
