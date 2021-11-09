const errorsHandler = (err, req, res, next) => {
  const { message } = err;
  let status = err.statusCode;

  if (!status) status = 500

  res.status(status).send({ message });
  next();
};

module.exports = errorsHandler;
