const userModel = require("../models/user.model")



module.exports.createUser = async ({firstName, lastName, email, hashPassword}) => {
    if (!firstName || !lastName || !email || !hashPassword) {
        throw new Error('All filds are required');
    }

    // 🔍 Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new Error('Email is already registered');
    }

    // ✅ Create and return the new user
    const user = userModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password: hashPassword
    })
    return user;
}