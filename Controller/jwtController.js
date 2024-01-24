const jwt = require('jsonwebtoken');

const createToken = async (req, res, next) => {
  const { email } = req.body;
  try {
    const payload = { email };
    const token = await jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: '1h',
    });
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.send({ success: true });
  } catch (error) {
    next(error);
  }
};

const removeToken = async (req, res) => {
  try {
    res.clearCookie('token', {
      maxAge: 0,
      secure: true,
      sameSite: 'none',
    });
    res.send({ success: true });
  } catch (error) {
    next(error);
  }
};

module.exports = { createToken, removeToken };
