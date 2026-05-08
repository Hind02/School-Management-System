const requestsByIp = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_POST_REQUESTS = 10;

const postRateLimiter = (req, res, next) => {
  if (req.method !== 'POST') {
    return next();
  }

  const now = Date.now();
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const timestamps = requestsByIp.get(ip) || [];
  const recentTimestamps = timestamps.filter((timestamp) => now - timestamp < WINDOW_MS);

  if (recentTimestamps.length >= MAX_POST_REQUESTS) {
    return res.status(429).json({
      message: 'Too many POST requests. Try again in one minute.'
    });
  }

  recentTimestamps.push(now);
  requestsByIp.set(ip, recentTimestamps);

  return next();
};

export default postRateLimiter;
