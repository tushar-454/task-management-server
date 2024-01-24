require('dotenv').config();
const Task = require('../Model/Task');
const jwt = require('jsonwebtoken');
const User = require('../Model/User');

const verifyUser = async (req, res, next) => {
  try {
    const token = req?.cookies?.token;
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
    }
    const decode = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.find({ email: decode.email });
    if (!user || user.length === 0) {
      res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decode;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyUser;
