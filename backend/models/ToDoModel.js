const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema(
  {
    toDo: { type: String, required: true },
  },
  { timestamps: true }
);

// factory function to return model for each date-based collection
function getTodoModelForDate(dateStr) {
  const safeDate = dateStr.replace(/-/g, "_");
  const modelName = `ToDo_${safeDate}`;
  const collectionName = `todo_${safeDate}`;

  if (mongoose.models[modelName]) {
    return mongoose.models[modelName];
  }

  return mongoose.model(modelName, toDoSchema, collectionName);
}

module.exports = getTodoModelForDate;
