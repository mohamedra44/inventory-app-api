const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = async (req, res, next) => {
  const { username, password, role } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    const error = new Error("This username is already taken");
    error.status = 400;
    return next(error);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    password: hashedPassword,
    role: role || "employee",
  });

  await newUser.save();

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      id: newUser._id,
      username: newUser.username,
      role: newUser.role,
    },
  });
};
