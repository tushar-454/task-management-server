const User = require('../Model/User');

const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const isExists = await User.find({ email });
    if (isExists.length > 0) {
      return res.status(200).json({ message: 'User Already exists' });
    }
    const createNewUser = new User({
      name,
      email,
    });
    const result = await createNewUser.save();
    res.status(201).json({ message: 'success' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser };
