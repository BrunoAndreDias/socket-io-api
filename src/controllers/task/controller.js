import Task from '../../models/task';

export async function createTask(req, res) {
  try {
    const { body } = req;

    const task = await Task.create(body);

    if (!task) {
      res.send({ error: true, message: 'Error creating the task.' });
    } else {
      res.send({ task });
    }
  } catch (e) {
    res.send({ error: true, message: e });
  }
}

export async function getTasks(req, res) {
  try {
    const tasks = await Task.find();
    if (!tasks) {
      res.send({ error: true, message: 'There is no tasks.' });
    } else {
      res.send({ tasks });
    }
  } catch (e) {
    res.send({ error: true, message: e });
  }
}

export async function updateTask(req, res) {
  try {
    const { body } = req;
    const taskUpdated = await Task.findOneAndUpdate(
      { _id: req.params.taskId },
      body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!taskUpdated) {
      res.send({ error: true, message: 'Task not updated.' });
    } else {
      res.send({ taskUpdated });
    }
  } catch (e) {
    res.send({ error: true, message: e });
  }
}

export async function deleteTask(req, res) {
  try {
    const taskDeleted = await Task.findByIdAndDelete(req.params.taskId);
    if (!taskDeleted) {
      res.send({ error: true, message: 'Task didnt got deleted.' });
    } else {
      res.send({ taskDeleted });
    }
  } catch (e) {
    res.send({ error: true, message: e });
  }
}
