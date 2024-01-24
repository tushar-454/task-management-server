const { model, Schema } = require('mongoose');

const tashSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  deadline: { type: String, require: true },
  priroty: { type: String, require: true },
  email: { type: String, require: true },
  createAt: { type: String, require: true },
  completedAt: { type: String, require: true },
  status: { type: String, require: true },
  trash: { type: Boolean, require: true },
});

const Task = model('Task', tashSchema, 'tasks');

module.exports = Task;
