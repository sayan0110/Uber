const { validationResult } = require("express-validator");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service")
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(200).json({ errors: errors.array() });
  }

  console.log(req.body);

  const { fullName, email, password, vehicals } = req.body;

  const isCaptainExists = await captainModel.findOne({ email });
  if (isCaptainExists) {
    return res.status(400).json({ error: "Captain with this email already exists" });
  }


  const hashPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashPassword,
    color: vehicals.color,
    plate: vehicals.plate,
    capacity: vehicals.capacity,
    carTypes: vehicals.carTypes,
  });
  console.log(captain);
  

  const token = captain.generateAuthToken();

  res.status(201).json({ message: "Captain registered successfully", captain, token });
};

module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(200).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(400).json({ error: "User not registered" });
  }

  const isMatch = await captain.comparePassword(password, captain.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid password" });
  }

  const token = captain.generateAuthToken();
  console.log(token);
  

  res.status(200).json({ message: "Login successful", captain, token });
};

module.exports.getCaptainProfile = async (req, res, next) => {
  const captainId = req.captain._id;

  const captain = await captainModel.findById(captainId).select("-password");
  if (!captain) {
    return res.status(404).json({ error: "Captain not found" });
  }

  res.status(200).json({ captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied, unauthorized' });
  }

  // Add token to blacklist
  await blacklistTokenModel.create({ token });

  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
}