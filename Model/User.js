const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
});

const User = model('User', userSchema, 'users');

module.exports = User;
