const blacklistTokenModel = require('../models/blacklistToken.model');
const userModel = require('../models/user.model');
const userService = require('../services/user.service')
const {validationResult } = require('express-validator')


module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);


    if(!errors.isEmpty()) {
        return res.status(200).json({errors: errors.array() });
    }



    console.log(req.body);
    
    const {fullName, email, password} = req.body;

    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
        return res.status(400).json({ error: "User with this email already exists" });
    }

    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstName: fullName.firstName.toLowerCase(),
        lastName: fullName.lastName.toLowerCase(),
        email: email.toLowerCase(),
        hashPassword
    })
    console.log(user);


    const token = user.generateAuthToken();

    res.status(200).json({token, user})
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(200).json({errors: errors.array() });
    }

    const {email, password} = req.body;

    // 🔍 Check if user exists
    const user = await userModel.findOne({email}).select('+password')
    if (!user) {
        return res.status(401).json({error: 'Invalid email or password'});
    }

    // ✅ Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({error: 'Invalid email or password'});
    }

    // 🔑 Generate token
    const token = user.generateAuthToken();

    res.status(200).json({token, user});
}

module.exports.getUserProfile = async (req, res, next) => {
    const userId = req.user._id;

    // 🔍 Fetch user profile
    const user = await userModel.findById(userId).select('-password');
    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }

    res.status(200).json({user});
}

module.exports.logoutUser = async (req, res, next) => {
    // Clear the token from cookies or headers
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blacklistTokenModel.create({ token });



    res.status(200).json({message: 'User logged out successfully'});
}