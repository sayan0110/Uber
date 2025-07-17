const express =  require('express')
const router = express.Router();
const {body} = require('express-validator')
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')



router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min:3}).withMessage('First name must be atlest 3 charecter'),
    body('fullName.lastName').isLength({min:3}).withMessage('First name must be atlest 3 charecter'),
    body('password').isLength({min:8}).withMessage('Password must be atlest 8 charecter'),
    
],
    userController.registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:8}).withMessage('Password must be atlest 8 charecter'),
],
userController.loginUser
)
router.get('/profile',authMiddleware.authUser, userController.getUserProfile);

router.get('/logout', authMiddleware.authUser, userController.logoutUser);









module.exports = router;