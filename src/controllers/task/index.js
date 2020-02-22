import { Router } from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from './controller';

function TaskRouter() {
  const router = Router();

  router
    .route('/task')
    .get(getTasks)
    .post(createTask);

  router
    .route('/task/:taskId')
    .put(updateTask)
    .delete(deleteTask);

  return router;
}

export default TaskRouter();
