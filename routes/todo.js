const router = require("express").Router();
const Todo = require("../models/Todo");

//add and create a todo
router.post("/add", async (req, res) => {
  try {
    const newTodo = new Todo({
      task: req.body.task,
      time: req.body.time,
    });
    await newTodo.save();
    res.status(200).json(newTodo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted From Todo List");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a todo
router.get("/search/:id", async (req, res) => {
  try {
    const showTodo = await Todo.findById(req.params.id);
    res.status(200).json(showTodo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
