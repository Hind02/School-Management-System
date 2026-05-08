const jsonValidator = (req, res, next) => {
  const methodsWithBody = ['POST', 'PUT', 'PATCH'];

  if (!methodsWithBody.includes(req.method)) {
    return next();
  }

  const contentType = req.headers['content-type'];

  if (!contentType || !contentType.includes('application/json')) {
    return res.status(415).json({
      message: 'Content-Type must be application/json'
    });
  }

  return next();
};

export default jsonValidator;
