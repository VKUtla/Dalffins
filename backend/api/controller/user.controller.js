//Author: Divyashree Bangalore Subbaraya (B00875916)
const passport = require('passport');

const User = require('../model/user.model')

const bcrypt = require("bcryptjs");

const jwt = require('jsonwebtoken');

const secret = require('../config/token.config')

//Function used for user registration POST call
module.exports.signUp = (req, res, next) => {
    try {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
        });
        // Save the user's data to MongoDb on successful registration
        user.save().then(data => {
            res.status(200).json({
                ...data['_doc'],
                token: jwt.sign({ id: user._id }, secret.ACCESS_TOKEN_SECRET, { expiresIn: '178009' })
            });
        }).catch(err => {
            if (err['code'] === 11000) {
                return (
                    //In case of duplicate email ID error returning error json.
                    res.status(400).json({
                        success: 'false',
                        message: `${Object.keys(err['keyValue'])} already registered!! Try again`
                    })
                )
            }
            else {
                //In case of other error returning error json.
                res.status(500).json({
                    success: 'false',
                    message: "Failure to save the data in db!",
                    error: err.message
                });
            }
        });
    }
    catch (error) {
        console.log(error)
    } (req, res, next);
};

//Function used for user login POST call
module.exports.login = (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return (
                //In case of error returning error json.
                res.status(400).json({
                    success: 'false',
                    message: "Bad Request",
                    error: err.message
                })
            )
        }
        else if (user) {
            return (
                // Validatation success json message
                res.status(200).json({
                    success: "true",
                    message: "Validation success",
                    token: jwt.sign({ id: user._id }, secret.ACCESS_TOKEN_SECRET, { expiresIn: '178009' }),
                    email: user.email,
                    id: user._id,
                    firstName: user.firstName
                })
            )
        }
        else {
            return (
                //In case of error returning error json.
                res.status(404).json({
                    success: 'false',
                    message: info
                })
            )
        }
    })(req, res, next);
};

//Function used for displaying user details on profile page GET call
module.exports.userProfile = (req, res, next) => {
    try {
        User.findById({ _id: req.params.id }, function (err, user) {

            if (!user) {
                return (
                    //In case of error returning error json.
                    res.status(404).json({
                        success: 'false',
                        message: "user not found!",
                    })
                )
            }

            else return (
                // Fetch the details of the user if found
                res.status(200).json({
                    success: "true",
                    message: "User found!",
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber
                })
            )
        });
    }
    catch (error) {
        console.log(error)
    } (req, res, next);
};

module.exports.updateUserPassword = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        await User.findByIdAndUpdate({ _id: req.params.id },
            {
                password: req.body.password
            },
            { returnOriginal: false }, function (err, userProfile) {

                if (err) {
                    return (
                        //In case of error returning error json.
                        res.status(400).json({
                            success: 'false',
                            message: "user not registered!"
                        })
                    )
                }
                else if (userProfile) {
                    return (
                        // Password updation success message
                        res.status(200).json({
                            success: "true",
                            message: "Update password success",
                        })
                    )
                }
                else {
                    return (
                        //In case of error returning error json.
                        res.status(404).json({
                            success: 'false',
                            message: info
                        })
                    )
                }
            })
    }
    catch (error) {
        console.log(error)
    } (req, res, next);
};

//Function used for updating user details PUT call
module.exports.updateUserProfile = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate({ _id: req.params.id },
            {
                $set:
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber
                },
            },
            { returnOriginal: false }, function (err, userProfile) {

                if (err) {
                    if (err['codeName'] === 'DuplicateKey') {

                        return (
                            //In case of already existing email ID, returning error json.
                            res.status(400).json({
                                success: 'false',
                                message: `${Object.keys(err['keyValue'])} already registered!! Try again`
                            })
                        )

                    }
                    return (
                        // If user is not registered, return error json
                        res.status(400).json({
                            success: 'false',
                            message: "user not registered!"
                        })
                    )
                }
                else if (userProfile) {
                    return (
                        // Return profile updation success
                        res.status(200).json({
                            success: "true",
                            message: "Update profile success",
                        })
                    )
                }
                else {
                    return (
                        //In case of error returning error json.
                        res.status(404).json({
                            success: 'false',
                            message: info
                        })
                    )
                }
            })
    }
    catch (error) {
        console.log(error)
    } (req, res, next);
};

//Function used for deletion of the user DELETE call
module.exports.deleteUserProfile = async (req, res, next) => {

    try {
        await User.findByIdAndDelete({ _id: req.params.id }, function (err, user) {
            if (!user) {
                return (
                    //In case of user not found, returning error json.
                    res.status(404).json({
                        success: 'false',
                        message: "user not found!",
                    })
                )
            }

            else {
                return (
                    //User deletion success, returning success json.
                    res.status(200).json({
                        success: "true",
                        message: "User Deleted!",
                    })
                )
            }
        })
    }
    catch (error) {
        console.log(error)
    } (req, res, next);
};


//Function used for password reset PUT call
module.exports.resetPassword = async (req, res, next) => {
    try {
        // Hash the entered password
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
        await User.findOneAndUpdate(
            { email: req.body.email },
            {
                password: req.body.password
            },
            { returnOriginal: false }, function (err, userProfile, info) {

                if (err) {
                    return (
                        //In case of error returning error json.
                        res.status(400).json({
                            success: 'false',
                            message: "user not registered!"
                        })
                    )
                }
                else if (userProfile) {
                    return (
                        //Password updation success
                        res.status(200).json({
                            success: "true",
                            message: "Update password success",
                        })
                    )
                }
                else {
                    return (
                        //In case of error returning error json.
                        res.status(404).json({
                            success: 'false',
                            message: info
                        })
                    )
                }
            })
    }
    catch (error) {
        console.log(error)
    } (req, res, next);
};

//Function used for checking the user's email POST call for the purpose of updating password.
module.exports.emailCheck = async (req, res, next) => {

    try {
        await User.findOne(
            { email: req.body.email }, function (err, userProfile, info) {

                if (err) {
                    return (
                        //In case of error returning error json.
                        res.status(404).json({
                            success: 'false',
                            message: "Bad request"
                        })
                    )
                }
                else if (userProfile) {
                    return (
                        //Registered email found
                        res.status(200).json({
                            success: "true",
                            message: "Email found success!",
                            email: userProfile.email,
                            id: userProfile._id,
                            firstName: userProfile.firstName
                        })
                    )
                }
                else {
                    return (
                        //In case of error returning error json.
                        res.status(400).json({
                            success: 'false',
                            message: info
                        })
                    )
                }
            })
    }
    catch (error) {
        console.log(error)
    } (req, res, next);
};
