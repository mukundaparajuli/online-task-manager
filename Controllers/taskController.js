const expressAsyncHandler = require("express-async-handler");
const Tasks = require("../Models/taskModel");

//@Desc post all tasks
//@routes POST /tasks/:id
//access public
const addTasks = expressAsyncHandler(async (req, res) => {
  console.log("The tasks here are", req.body);
  const { taskName, taskDescription, startTime, endTime } = req.body;
  if (!taskName || !startTime || !endTime) {
    res.status(400).send("All fields are mandatory");
    return;
  }
  const task = await Tasks.create({
    taskName,
    taskDescription,
    startTime,
    endTime,
  });
  res.json(task);
});

//@Desc get all tasks
//@routes GET /tasks/:id
//access public
const getTasks = expressAsyncHandler(async (req, res) => {
  const task = await Tasks.findById(req.params.id);
  if (!task) {
    res.status(404).send("Tasks not found");
    return;
  }
  res.json(task);
});

//@Desc get all tasks
//@routes GET /tasks/:id
//access public
const putTasks = expressAsyncHandler(async (req, res) => {
  const task = await Tasks.findById(req.params.id);
  if (!task) {
    res.status(404).send("Tasks not found");
    return;
  }
  const updatedTask = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTask);
});

//@Desc get all tasks
//@routes DELETE /tasks/:id
//access public
const deleteTasks = expressAsyncHandler(async (req, res) => {
  const task = await Tasks.findById(req.params.id);
  if (!task) {
    res.status(404).send("Task not found");
    return;
  }
  await Tasks.findByIdAndDelete(req.params.id);
  res.status(202).send(`Delete tasks for ${req.params.id}`);
});

module.exports = { getTasks, addTasks, putTasks, deleteTasks };
