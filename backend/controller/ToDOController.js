const getTodayTodoModel = require("../models/ToDoModel");

// GET all todos for today's session
module.exports.getToDos = async (req, res) => {
  try {
    const ToDoModel = getTodayTodoModel();
    const toDos = await ToDoModel.find();
    res.send(toDos);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error fetching todos", error: err });
  }
};

// POST - create todo for today's session
module.exports.saveToDo = async (req, res) => {
  try {
    const { toDo } = req.body;
    const ToDoModel = getTodayTodoModel();

    const data = await ToDoModel.create({ toDo });
    console.log("Saved Successfully...");
    res.status(201).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error saving todo", error: err });
  }
};

// PUT - update todo by id in today's session
module.exports.updateToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const { toDo } = req.body;
    const ToDoModel = getTodayTodoModel();

    await ToDoModel.findByIdAndUpdate(id, { toDo });
    res.send("Updated Successfully...");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: err, msg: "Something went wrong while updating!" });
  }
};

// DELETE - remove todo by id in today's session
module.exports.deleteToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const ToDoModel = getTodayTodoModel();

    await ToDoModel.findByIdAndDelete(id);
    res.send("Deleted Successfully...");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: err, msg: "Something went wrong while deleting!" });
  }
};
