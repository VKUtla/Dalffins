//Author: Divyashree Bangalore Subbaraya (B00875916)
const express = require('express')

const router = express.Router();

const userController = require('../controller/user.controller')

const jwtAuth = require('../config/jwt.config')

//POST Route for the user signup
router.post('/signUp', userController.signUp);

//POST Route for the user login
router.post('/login', userController.login);

//GET Route to fetch all the user details 
router.get('/userProfile/:id', jwtAuth.jwtAuthenticate, userController.userProfile);

router.put('/resetPassword/:id', userController.updateUserPassword);

//PUT Route to update the user details based on the user ID
router.put('/updateProfile/:id', userController.updateUserProfile);

//DELETE Route to delete the user details based on the user ID
router.delete('/deleteProfile/:id', userController.deleteUserProfile);

//PUT Route to reset the password
router.put('/resetPassword', userController.resetPassword);

//POST Route to verify the registered email to reset password
router.post('/emailCheck',userController.emailCheck);

module.exports = router;

