const express = require("express");
const router = express.Router();
const app = express();
const {
  getTasks,
  addTasks,
  putTasks,
  deleteTasks,
} = require("../Controllers/taskController");
const validateTokenHandler = require("../middlewares/validateTokenHandler");
router.use(validateTokenHandler)
router
  .route("/tasks/")
  .post(addTasks);
  router
  .route("/tasks/:userid/:id")
  .get(getTasks)
  .put(putTasks)
  .delete(deleteTasks)

module.exports = router;
