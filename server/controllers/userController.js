const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../models/User");

const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, timezone } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      email,
      password,
      timezone,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getUsersWithNotifications = async (req, res) => {
  try {
    const usersWithNotifications = await User.aggregate([
      {
        $lookup: {
          from: "notifications",
          localField: "notifications",
          foreignField: "_id",
          as: "notifications",
        },
      },
    ]);
    return res.status(200).json({ usersWithNotifications });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching users with notifications:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  signup,
  getUsersWithNotifications,
};
