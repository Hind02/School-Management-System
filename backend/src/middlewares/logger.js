const logger = (req, res, next) => {
  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;
    console.log(`${req.method} ${req.originalUrl} ${durationMs.toFixed(2)}ms`);
  });

  next();
};

export default logger;
