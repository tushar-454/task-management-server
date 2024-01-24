const Task = require('../Model/Task');

/**
 * here add a task
 * data come from body
 * title,desc,deadline,priroty,email
 */
const addTask = async (req, res, next) => {
  try {
    const { title, description, deadline, priroty, email } = req.body;
    const createTask = new Task({
      title,
      description,
      deadline,
      priroty,
      email,
      createAt: new Date(),
      completedAt: '',
      status: 'todo',
      trash: false,
    });
    const result = await createTask.save();
    res.status(201).json({ message: 'success' });
  } catch (error) {
    next(error);
  }
};

/**
 * get task using email
 * here no get all task function
 */
const getTask = async (req, res, next) => {
  try {
    const id = req.query.id;
    const status = req.query.status;
    const email = req.params.email;
    if (id) {
      const result = await Task.findById(id);
      return res.status(200).json(result);
    }
    if (status) {
      const filter = { email, trash: false, status };
      if (status === 'completed') {
        filter.completedAt = new Date().toLocaleDateString();
      }
      const result = await Task.find(filter);
      return res.status(200).json(result);
    }
    const result = await Task.find({ email, trash: false });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTask,
  getTask,
};
