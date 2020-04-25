const passport = require('passport'); 
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userAuth = require('../dbModels/userAuth');
const { USER_CUSTOMER, USER_SELLER, USER_ADMIN } = require('../config/types');
const checkAuth = require('../config/passport');

const isValidPassword = (chk_password, db_password_hash) => {
    return bcrypt.compareSync(chk_password, db_password_hash);
}


// API: GET /signin
// used to check they jwt token validity
router.get('/', checkAuth, async (req, res) => {
    // query user_auth collection with jwt data to check if the jwt token is still valid    
    console.log(req.user); 
    res.status(200).json(req.user);

    // try {
    //     const userAuthResult = await UserAuth.findOne({ _id : req.jwtData.user_id });
    //     if (userAuthResult) { // jwtData is valid (token authorized): send user data
    //         res.json({
    //             user_id: req.jwtData.user_id,
    //             email: req.jwtData.email,
    //             user_type: req.jwtData.user_type
    //         });
    //     } else {
    //         res.status(401).send('Unauthorized');
    //     }
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).send(err);        
    // }
});


//
/**
 * jwt signed as:
 * {
     email,
     name,
     userId 
     userType 
 * }
 */

// Post /signin
router.post('/', async (req, res, next) => {
    const {email, password} = req.body;
    console.log('/login req.data: ', req.body);

    try {
        const userAuthResult = await userAuth.findOne({ email });
        console.log('dbResponse:', userAuthResult);
        if(userAuthResult) {
            if(isValidPassword(password, userAuthResult.password)) {
                const token = jwt.sign({
                    email,
                    name: userAuthResult.name,
                    userId : userAuthResult._id,
                    userType : userAuthResult.userType
                    }, 
                    process.env.JWT_KEY,
                    { expiresIn: '2h' }
                );
                //Sucess, send a jwt token back
                return res.status(200).json({
                    'msg': 'authentication successful',
                    token
                });
            } else {
                return res.status(401).send('Unauthorized');
            }
        } else {
            return res.status(401).send('No such user');
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});



module.exports = router;