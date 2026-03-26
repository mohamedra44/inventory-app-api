const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("This email is already taken");
    error.status = 400;
    return next(error);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: role || "employee",
  });

  await newUser.save();

  const token = jwt.sign(
    {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    token: token,
    user: {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    },
  });
};
