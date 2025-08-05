const express =  require('express')
const router = express.Router();
const {body} = require('express-validator')
const captainController = require('../controllers/captain.controller')
const authMiddleware = require('../middlewares/auth.middleware')


router.post('/register', [
    body('fullName.firstName').notEmpty().withMessage('First name is required'),
    body('fullName.lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicals.color').notEmpty().withMessage('Color is required'),
    body('vehicals.plate').notEmpty().withMessage('Plate is required'),
    body('vehicals.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicals.carTypes').isIn(['car', 'motorcycle', 'auto']).withMessage('Car type must be one of: card, motorcycle, auto')
], captainController.register)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 8 characters long'),
], captainController.login)


router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);


module.exports = router;