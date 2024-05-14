module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/",
  MONGODB_NAME: process.env.MONGODB_NAME || "mern-notification-app",
  // CRON_HOURS: 9, // For testing purpose
  CRON_HOURS: process.env.CRON_HOURS || 8,
  // CRON_MINUTES: 35 // For testing purpose
  CRON_MINUTES: process.env.CRON_MINUTES || 0,
};
