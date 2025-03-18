const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';
const JWT_EXPIRES_IN = '7d';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// @desc   Register user
// @route  POST /api/auth/register
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ username, email, password });

    const token = generateToken(user._id);

    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc   Login user
// @route  POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(email,password,'ep')
    const user = await User.findOne({ email });
    console.log(user,'user')
    if (!user)
      return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    console.log(isMatch,'isMatch')
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.signup = async (req, res) => {
  console.log(req.body)
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    console.log(existingUser)
    const newUser = new User({ username, email, password });
    console.log(newUser)
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
// @desc   Get current user
// @route  GET /api/auth/me
// @access Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
