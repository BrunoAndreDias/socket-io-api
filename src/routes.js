import { Router } from 'express';
import TaskApi from './controllers/task';

export const initialize = () => {
  const api = Router();

  api.use(TaskApi);

  return api;
};

export default {
  initialize,
};
