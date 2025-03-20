const { rateLimit } = require("express-rate-limit");

module.exports.appRateLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: "Try Again after few minutes!",
});
