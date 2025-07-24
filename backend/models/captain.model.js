const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "First name must contain at least 3 characters"],
      maxlength: [20, "First name cannot be greater than 20 characters"],
    },
    lastName: {
      type: String,
      required: true,
      minlength: [3, "Last name must contain at least 3 characters"],
      maxlength: [20, "Last name cannot be greater than 20 characters"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: [8, "Password must contain at least 8 characters"],
    required: true,
    select: false,
  },
  vehicals: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least 3 charecter long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "car number must be at least 3 charecter long"],
    },
    capacity: {
      type: Number,
      required: true,
      minlength: [1, "enter the number fo your car capacity"],
    },
    carTypes: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  location: {
    lat: {
        type: Number
    },
    long: {
        type: Number,
    }
  },
  soketId: {
    type: String,
  },
});



captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id, fullname: this.fullName, email: this.email, vehicals: this.vehicals, status: this.status, location: this.location}, process.env.JWT_CAPTAIN_KEY, {expiresIn: '10Y'});
    return token;
}

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


const captainModel = mongoose.model('captain', captainSchema);
module.exports = captainModel;