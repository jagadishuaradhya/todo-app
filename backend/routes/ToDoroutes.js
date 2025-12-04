const { Router } = require("express");
const {
  getToDos,
  saveToDo,
  updateToDo,
  deleteToDo,
} = require("../controller/ToDOController");

const router = Router();

// optional date parameter — defaults to today
router.get("/get/:date?", getToDos);
router.post("/save/:date?", saveToDo);
router.put("/update/:id/:date?", updateToDo);
router.delete("/delete/:id/:date?", deleteToDo);

module.exports = router;
