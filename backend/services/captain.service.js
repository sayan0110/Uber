const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({ firstName, lastName, email, password, color, plate, capacity, carTypes }) => {


    if (!firstName || !lastName || !email || !password || !color || !plate || !capacity || !carTypes) {
        throw new Error('All fields are required');
    }

    const captain = await captainModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        vehicals: {
            color,
            plate,
            capacity,
            carTypes
        }
    });
    return captain;
}