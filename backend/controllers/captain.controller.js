const { validationResult } = require("express-validator");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service")

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
