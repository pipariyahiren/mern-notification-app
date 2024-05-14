const express = require("express");
const { check } = require("express-validator");
const {
  signup,
  getUsersWithNotifications,
} = require("../controllers/userController");

const router = express.Router();

// User signup
router.post(
  "/signup",
  [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters",
    ).isLength({ min: 6 }),
    check("timezone", "Timezone is required").not().isEmpty(),
  ],
  signup,
);
router.get("/getUsers", getUsersWithNotifications);

module.exports = router;
