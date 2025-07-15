const userModel = require('../models/user.model');
const userService = require('../services/user.service')
const {validationResult } = require('express-validator')


module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);

    // if(errors.isEmpty()) {
    //     return res.status(200).json({msg: "All OK" });
    // }
    if(!errors.isEmpty()) {
        return res.status(200).json({errors: errors.array() });
    }



    console.log(req.body);
    
    const {fullName, email, password} = req.body;

    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
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
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }

    // ✅ Compare password
    const isMatch = await user.compairMethods(password);
    if (!isMatch) {
        return res.status(401).json({error: 'Invalid credentials'});
    }

    // 🔑 Generate token
    const token = user.generateAuthToken();

    res.status(200).json({token, user});
}