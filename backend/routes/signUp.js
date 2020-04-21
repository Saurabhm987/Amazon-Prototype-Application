const passport = require('passport'); 
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userAuth = require('../dbModels/userAuth');
const { USER_CUSTOMER, USER_SELLER, USER_ADMIN } = require('../config/types');

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

// Post /signUp/customer
router.post('/customer', async (req, res) => {    
    const { name, email, password } = req.body;
    try {
        let user = await userAuth.findOne({ email });
        if(user) {            
            return res.status(400).json({ error: `email ${email} already exists` });
        }

        user = new userAuth({
            name,
            email, 
            password: hashPassword(password), 
            userType: USER_CUSTOMER
        });

        const dbResp = await user.save();
        console.log(dbResp);
        
        // create jwt token and send response
        const token = jwt.sign(
            {
                email,
                name,
                userId : dbResp._id,
                userType : USER_CUSTOMER
            },
            process.env.JWT_KEY,
            { expiresIn: '2h' }
        );

        //Success, send a jwt token back
        return res.status(200).json({
            'msg': 'new customer account created',
            token
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');        
    }
});

// Post /signUp/seller
// for seller, name param shoould also be unique
router.post('/seller', async (req, res) => {
    console.log('req boby: ', req.body);
    const { name, email, password } = req.body;
    try {
        let user = await userAuth.findOne({ 
            $or: [
                {email:email},
                {$and: [{ userType: USER_SELLER }, { name: name }]}
            ]
        });
        if(user) {       
            if(user.email === email)     
                return res.status(400).json({ error: `email ${email} already exists` });
            if(user.name === name)
                return res.status(400).json({ 
                    error: `name ${name} already exists, choose a different name` 
                });
        }

        user = new userAuth({
            name,
            email, 
            password: hashPassword(password), 
            userType: USER_SELLER
        });

        const dbResp = await user.save();
        console.log(dbResp);
        
        // create jwt token and send response
        const token = jwt.sign(
            {
                email,
                name,
                userId : dbResp._id,
                userType : USER_SELLER
            },
            process.env.JWT_KEY,
            { expiresIn: '2h' }
        );

        //Success, send a jwt token back
        return res.status(200).json({
            'msg': 'new seller account created',
            token
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');        
    }
});

// Post /signUp/admin
router.post('/admin', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await userAuth.findOne({ email });
        if(user) {            
            return res.status(400).json({ error: `email ${email} already exists` });
        }

        user = new userAuth({
            name,
            email, 
            password: hashPassword(password), 
            userType: USER_ADMIN
        });

        const dbResp = await user.save();
        console.log(dbResp);
        
        // create jwt token and send response
        const token = jwt.sign(
            {
                email,
                name,
                userId : dbResp._id,
                userType : USER_ADMIN
            },
            process.env.JWT_KEY,
            { expiresIn: '2h' }
        );

        //Success, send a jwt token back
        return res.status(200).json({
            'msg': 'new admin account created',
            token
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');        
    }

});


module.exports = router;
// module.exports = app => {
//     app.post('/registerStudent', (req, res, next )=>{
//         passport.authenticate('register', (err, user, info) => {
//             console.log("singUp route handler!!");
//         })(req, res, next);
//     });
// }
