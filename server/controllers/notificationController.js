const Notification = require("../models/Notification");

const createNotification = async (userId, timestamp) => {
  try {
    const notification = new Notification({
      userId,
      timestamp,
    });
    await notification.save();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error creating notification:", error);
  }
};

module.exports = {
  createNotification,
};
