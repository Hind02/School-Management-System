const apiKey = (req, res, next) => {
  const expectedApiKey = process.env.API_KEY || 'edunode-admin-key';
  const providedApiKey = req.headers['x-api-key'];

  if (providedApiKey !== expectedApiKey) {
    return res.status(401).json({
      message: 'Invalid or missing API key'
    });
  }

  return next();
};

export default apiKey;
