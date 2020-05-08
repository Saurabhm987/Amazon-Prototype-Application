
handle_request = async(req, callback) => {
    if (req.type === "registerBuyer") {
        const { name, email, password } = req.body;
        try {
            let user = await userAuth.findOne({ email });
            if(user) {   
                let error = new Error();
                error.message = `email ${email} already exists`;
                error.statusCode = 400;
                throw error;
                // return res.status(400).json({ error: `email ${email} already exists` });
            }
    
            user = new userAuth({
                name,
                email, 
                password: hashPassword(password), 
                userType: USER_CUSTOMER
            });
    
            const dbResp = await user.save();
            console.log(dbResp);
    
            let custProfile = new buyer({
                _id: dbResp._id,
                name,
                email,
            });
            const custResp = await custProfile.save();
            console.log(custResp);
            
    
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
            return { "status": 200, body: {
                'msg': 'new customer account created',
                token
            }};
        } catch (error) {
            console.error(error.message);
            if (error.message)
                message = error.message
            else
                message = 'Error while fetching products'
            if (error.statusCode)
                code = error.statusCode
            else
                code = 500
            return { "status": code, body: { message } }        
        }


    }
    else if (req.type === "registerSeller") {
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
                if(user.email === email) {
                    let error = new Error();
                    error.message = `email ${email} already exists`;
                    error.statusCode = 400;
                    throw error;
                }
                if(user.name === name) {
                    let error = new Error();
                    error.message = `name ${name} already exists, choose a different name`;
                    error.statusCode = 400;
                    throw error;
                }
            }
    
            user = new userAuth({
                name,
                email, 
                password: hashPassword(password), 
                userType: USER_SELLER
            });
    
            const dbResp = await user.save();
            console.log(dbResp);
    
            // create profile
            let sellerProfile = new seller({
                _id: dbResp._id,
                name,
                email,
            });
            const profile = await sellerProfile.save();
            console.log(profile);
            
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
            return ({
                status: 200,
                body: {
                    'msg': 'new seller account created',
                    token
                }
            });
        } catch (error) {
            console.error(error.message);
            if (error.message)
                message = error.message;
            else
                message = 'Error while fetching products';
            if (error.statusCode)
                code = error.statusCode;
            else
                code = 500;
            return { "status": code, body: { message } };   
        }


    }
    else if (req.type === "registerAdmin") {
        const { name, email, password } = req.body;
        try {
            let user = await userAuth.findOne({ email });
            if(user) {
                let error = new Error();
                error.message = `email ${email} already exists`;
                error.statusCode = 400;
                throw error;
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
            return ({
                status: 200,
                body : {
                    'msg': 'new admin account created',
                    token
                }
            });
        } catch (error) {
            console.error(error.message);
            if (error.message)
                message = error.message;
            else
                message = 'Error while fetching products';
            if (error.statusCode)
                code = error.statusCode;
            else
                code = 500;
            return { "status": code, body: { message } };   
        }
    


    }
}

exports.handle_request = handle_request;
