## Implementation Details

### Cron Job Setup

The cron functionality is implemented using the `node-cron` package. Here's how it's set up:

1. **Cron Schedule**: 
   - The cron job is scheduled to run every minute.
   - For each iteration, it fetches the current time and checks if it's 8 AM in the user's respective timezone.
   - If the condition is met, it triggers the `createNotification` function for the users in that timezone.

### Notification Logic

When the cron job is triggered, it fetches users grouped by their timezones. For each timezone, it checks if it's 8 AM and, if so, creates notifications for all users in that timezone.

### Database Schema Changes

The `User` schema has been updated to include an array of notification IDs:

```javascript
(async () => {
  try {
    await User.updateMany({}, { $set: { notifications: [] } });
    console.log('Schema updated successfully');
  } catch (error) {
    console.error('Error updating schema:', error);
  }
})();
```

---

## Maintenance and Troubleshooting

### Maintenance

To maintain the cron functionality, follow these steps:

1. **Check Cron Jobs**: 
   - Regularly check the cron job setup in the `scheduleNotificationJob` function.
   - Ensure that the cron schedule is set correctly.
   
2. **Monitor Logs**:
   - Monitor the application logs to ensure that the cron job is running as expected.
   - Look for any errors related to the cron job setup.

**Note:** In Docker if you want to check log hit `docker logs -f <Container_ID>` from root of the project

### Troubleshooting

If you encounter any issues with the cron functionality, follow these troubleshooting steps:

1. **Check Cron Job Setup**:
   - Verify the cron schedule in the `scheduleNotificationJob` function.
   - Ensure that the cron job is scheduled to run at the correct time.

2. **Inspect Logs**:
   - Check the application logs for any errors related to the cron job setup.
   - Look for any exceptions or warnings that might indicate issues with the cron functionality.

3. **Test Cron Job**:
   - Manually trigger the cron job to see if it's working as expected.
   - Adjust the cron schedule if necessary and monitor the application logs for any errors.
   - You can also adjust the time for trigger from server/config.js or .env  `CRON_HOURS` & `CRON_MINUTES` are variable to set the value for trigger notification. Default value is 8 hours and 00 minute.  
