const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

(async () => {
  try {
    await User.updateMany({}, { $set: { notifications: [] } });
    // eslint-disable-next-line no-console
    console.log("Schema updated successfully");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error updating schema:", error);
  }
})();

module.exports = User;
