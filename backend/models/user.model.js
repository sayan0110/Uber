const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3,'First name must contains 3 charecter'],
            maxlength: [20, 'First name can not be gretter that 20 charecter']
        },
        lastName: {
            type: String,
            required: true,
            minlength: [3,'First name must contains 3 charecter'],
            maxlength: [20, 'First name can not be gretter that 20 charecter']
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: [8,'First name must contains 8 charecter'],
        required: true,
        select: false
    },
    soketId: {
        type: String,
    }
})


userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, fullName: this.fullName, email: this.email}, process.env.JWT_SECRET, {expiresIn: '1d'});
    return token;
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}



const userModel = mongoose.model('user', userSchema);



module.exports = userModel;