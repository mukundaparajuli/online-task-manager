const express = require("express");
const router = express.Router();
const {
  getTasks,
  addTasks,
  putTasks,
  deleteTasks,
} = require("../Controllers/taskController");

router
  .route("/tasks/:id")
  .get(getTasks)
  .put(putTasks)
  .delete(deleteTasks)
  .post(addTasks);

module.exports = router;
