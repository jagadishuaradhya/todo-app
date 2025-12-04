const getTodoModelForDate = require("../models/ToDoModel");

// return today as YYYY-MM-DD
function todayStr() {
  return new Date().toISOString().split("T")[0];
}

// GET all todos for selected date
module.exports.getToDos = async (req, res) => {
  try {
    const date = req.params.date || todayStr();
    const ToDo = getTodoModelForDate(date);

    const toDos = await ToDo.find().sort({ createdAt: 1 });
    res.send(toDos);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching todos");
  }
};

// POST - create todo
module.exports.saveToDo = async (req, res) => {
  try {
    const date = req.params.date || todayStr();
    const { toDo } = req.body;

    const ToDo = getTodoModelForDate(date);

    const data = await ToDo.create({ toDo });
    console.log("Saved Successfully...");
    res.status(201).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving todo");
  }
};

// PUT - update todo
module.exports.updateToDo = async (req, res) => {
  try {
    const date = req.params.date || todayStr();
    const { id } = req.params;
    const { toDo } = req.body;

    const ToDo = getTodoModelForDate(date);

    await ToDo.findByIdAndUpdate(id, { toDo });
    res.send("Updated Successfully...");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating todo");
  }
};

// DELETE - remove todo
module.exports.deleteToDo = async (req, res) => {
  try {
    const date = req.params.date || todayStr();
    const { id } = req.params;

    const ToDo = getTodoModelForDate(date);

    await ToDo.findByIdAndDelete(id);
    res.send("Deleted Successfully...");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting todo");
  }
};
