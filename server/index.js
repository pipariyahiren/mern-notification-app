const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");
const config = require("./config");
const { scheduleNotificationJob } = require("./utils/cron");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(config.MONGODB_URI, {
    dbName: config.MONGODB_NAME,
  })
  // eslint-disable-next-line no-console
  .then(() => console.log("MongoDB connected"))
  // eslint-disable-next-line no-console
  .catch((err) => console.error("MongoDB connection error", err));

// Routes
app.use("/api/users", usersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
  scheduleNotificationJob();
});
