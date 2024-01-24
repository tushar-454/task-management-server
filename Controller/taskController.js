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

/**
 * delete a task using id
 */
const delTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Task.findByIdAndDelete(id);
    res.status(202).json({ message: 'success' });
  } catch (error) {
    next(error);
  }
};

/**
 * trash a task using the id
 * this is a post method change a trash property value
 */
const trashTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const trashStatus = req.body.trashStatus;
    const result = await Task.findOneAndUpdate(
      { _id: new Object(id) },
      { trash: trashStatus }
    );
    res.status(200).json({ message: 'success' });
  } catch (error) {
    next(error);
  }
};

/**
 * this a task status change api
 * call this api doing a task todo to ongoing or todo to completed and more
 */
const handleStatusTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { status, completedAt } = req.body;
    const updateTask = {
      status,
      completedAt,
    };
    const result = await Task.findOneAndUpdate(
      { _id: new Object(id) },
      updateTask
    );
    res.status(200).json({ message: 'success' });
  } catch (error) {
    next(error);
  }
};

/**
 * update a task
 * this is a put method update some value
 * title, description, deadline and priroty
 */
const updateTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, description, deadline, priroty } = req.body;
    const result = await Task.findOneAndUpdate(
      { _id: new Object(id) },
      {
        title,
        description,
        deadline,
        priroty,
      }
    );
    res.status(200).json({ message: 'success' });
  } catch (error) {
    next(error);
  }
};

/**
 * get some specific task by property value
 * here based on property we get all trash task or all completed task
 */
const specificTask = async (req, res, next) => {
  try {
    const email = req.params.email;
    const { property, value } = req.query;
    if (property === 'trash') {
      const result = await Task.find({ trash: !!value, email });
      res.status(200).json(result);
      return;
    }
    if (property === 'status') {
      const result = await Task.find({ status: value, email });
      res.status(200).json(result);
      return;
    }
    res.status(200).json({ message: 'success', data: [] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTask,
  getTask,
  delTask,
  trashTask,
  handleStatusTask,
  updateTask,
  specificTask,
};
