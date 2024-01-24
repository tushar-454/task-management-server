const globalError = (err, req, res, next) => {
  const error = err.message ? err.message : 'Server is occured!';
  const status = err.status ? err.status : 500;
  res.status(status).json({ message: error });
};

module.exports = globalError;
