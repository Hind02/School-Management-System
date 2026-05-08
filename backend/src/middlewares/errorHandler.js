const errorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      message: 'Invalid JSON body'
    });
  }

  const status = err.status || 500;
  const message = err.message || 'Internal server error';

  return res.status(status).json({ message });
};

export default errorHandler;
