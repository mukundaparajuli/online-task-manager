const expressAsyncHandler = require("express-async-handler");
const Tasks = require("../Models/taskModel");

//@Desc post tasks
//@routes POST /tasks/
//access private
const addTasks = expressAsyncHandler(async (req, res) => {
  console.log("The tasks here are", req.body);
  const { taskName, taskDescription, startTime, endTime } = req.body;
  if (!taskName || !startTime || !endTime) {
    res.status(400)
    throw new Error("Task name, starting time and ending time are mandatory");
    return;
  }

  const task = await Tasks.create({
    user_id: req.user.id,
    taskName,
    taskDescription,
    startTime,
    endTime,
  });
  res.json(task);
});

//@Desc get all tasks
//@routes GET /tasks/:userid
//access private
const getTasks = expressAsyncHandler(async (req, res) => {
  const task = await Tasks.find({ user_id: req.user.id });
  if (!task) {
    res.status(404).send("Tasks not found");
    return;
  }
  res.json(task);
});


//@Desc get a task
//@routes GET /tasks/details/:task_id
//access private
const getTask = expressAsyncHandler(async (req, res) => {
  const task = await Tasks.findById(req.params.task_id);
  console.log(req.params.task_idd)
  if (!task) {
    res.status(404).send("Task not found");
    return;
  }
  res.json(task);
});

//@Desc put all tasks
//@routes PUT /tasks/:task_id
//access private
const putTasks = expressAsyncHandler(async (req, res) => {
  const task = await Tasks.findById(req.params.task_id);
  if (!task) {
    res.status(404)
    throw new Error("Tasks not found");
    return;
  }
  const { taskName, taskDescription, startTime, endTime } = req.body;
  if (!taskName || !startTime || !endTime) {
    res.status(400).send("Task name, starting time and ending time are mandatory");
    return;
  }
  const updatedTask = await Tasks.findByIdAndUpdate(req.params.task_id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTask);
});

//@Desc get all tasks
//@routes DELETE /tasks/:task_id
//access private
const deleteTasks = expressAsyncHandler(async (req, res) => {
  const task = await Tasks.findById(req.params.task_id);
  if (!task) {
    res.status(404).send("Task not found");
    return;
  }
  await Tasks.findByIdAndDelete(req.params.task_id);
  res.status(202).send(`Delete tasks for ${req.params.task_id}`);
});

module.exports = { getTasks, addTasks, putTasks, deleteTasks, getTask };
