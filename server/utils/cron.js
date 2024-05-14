const cron = require("node-cron");
// eslint-disable-next-line import/no-extraneous-dependencies
const moment = require("moment-timezone");
const Notification = require("../models/Notification");
const User = require("../models/User");
const config = require("../config");

const createNotification = async (userId, timestamp) => {
  try {
    const notification = new Notification({
      userId,
      timestamp,
    });
    await notification.save();
    await User.findByIdAndUpdate(userId, {
      // eslint-disable-next-line no-underscore-dangle
      $push: { notifications: notification._id },
    });

    // eslint-disable-next-line no-console
    console.log("Notification saved:", notification);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error creating notification:", error);
  }
};

const scheduleNotificationJob = () => {
  const cronSchedule = "* * * * *";
  cron.schedule(cronSchedule, async () => {
    try {
      const now = moment();
      const usersByTimezone = await User.aggregate([
        { $group: { _id: "$timezone", userIds: { $push: "$_id" } } },
      ]);

      usersByTimezone.forEach(async (timezoneGroup) => {
        const { _id: timezone, userIds } = timezoneGroup;
        const nowInUserTimezone = now.clone().tz(timezone);
        if (
          nowInUserTimezone.hour() === (config.CRON_HOURS || 8) &&
          nowInUserTimezone.minute() === (config.CRON_MINUTES || 0)
        ) {
          const timestamp = nowInUserTimezone.toDate();

          // Create notifications for users in this timezone
          userIds.forEach(async (userId) => {
            await createNotification(userId, timestamp);
          });
        }
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error scheduling notification job:", error);
    }
  });
};

module.exports = {
  scheduleNotificationJob,
};
