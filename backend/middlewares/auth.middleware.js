const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
   const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
   if (!token) {
       return res.status(401).json({error: 'Access denied, unauthorized'});
   }
   const isBlacklisted = await blacklistTokenModel.exists({ token });
   if (isBlacklisted) {
        return res.status(401).json({error: 'Token is blacklisted'});
    }
    try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       const user = await userModel.findById(decoded._id);
       if (!user) {
           return res.status(401).json({error: 'no user found'});
       }
       req.user = user;
       next();
    } catch (error) {
        return res.status(400).json({error: 'Invalid token'});
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({error: 'Access denied, unauthorized,no token'});
    }
    const isBlacklisted = await blacklistTokenModel.exists({ token });
    if (isBlacklisted) {
        return res.status(401).json({error: 'Token is blacklisted'});
    }
   try {
       const decoded = jwt.verify(token, process.env.JWT_CAPTAIN_KEY);
       const captain = await captainModel.findById(decoded._id);
       if (!captain) {
           return res.status(401).json({error: 'no captain found'});
       }
       req.captain = captain;
       next();
   } catch (error) {
       return res.status(400).json({error: 'Invalid token'});
   }
}