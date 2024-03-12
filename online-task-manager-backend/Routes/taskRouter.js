const express = require("express");
const router = express.Router();
const app = express();
const {
  getTasks,
  addTasks,
  putTasks,
  deleteTasks,
  getTask,
} = require("../Controllers/taskController");

const validateTokenHandler = require("../middlewares/validateTokenHandler");
router.use(validateTokenHandler)
router
  .route("/tasks/")
  .post(addTasks);
router
  .route("/tasks/:userid")
  .get(getTasks);

router
  .route("/tasks/details/:task_id")
  .get(getTask);
  
router
  .route("/tasks/:task_id")
  .put(putTasks)
  .delete(deleteTasks)

module.exports = router;
