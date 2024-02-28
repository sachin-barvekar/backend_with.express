const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
require('dotenv').config();

//signup route handler
exports.signup = async(req, res)=>{
    try{
        //step 1: get data
        const {name, email, password, role}=req.body;
        //step 2: check if user already exist
        const existingUser = await User.findOne({email});
        //step 3: if user already exist then return response
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already Exists"
            })
        }

        //step 4: secure/ hash the password
        let hashedPassword;
        try{
            //successful in hash password
            //To hash a password use bcrypt.hash(plainTextPassword, salt, callback) which returns a promise if no callback is passed.
            hashedPassword = await bcrypt.hash(password, 10); //hash(kisko hash krna hai, salt/noofrounds) used for secure the password
        }
        catch(err){
            //error in hash password
            return res.status(500).json({
                success: false,
                message: "Error in hashing password"
            })
        }

        //step 5: create entry for user in DB
        const user = await User.create({
            name,email, password:hashedPassword, role
        })
        //step 6:  RETURN RES
        return res.status(200).json({
            success:true,
            message: "user created successfully"
        })
    }
    //if signup fails,
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registerd, please try again later"
        })
    }
}

exports.login = async (req, res) =>{
    try{
        //step 1: data fetch
        const {email, password} = req.body;

        //step 2: validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully"
            })
        }

        //step 3: check for the registered user
        let user = await User.findOne({email});

        //if not a registered user
        if(!user){
            return res.status(401).json({
                success: false,
                message : "User is not registered"
            })
        }

        const payload = {
            email:user.email,
            id:user._id,
            role: user.role
        }
        //step 4: verify password and generate a JWT token
        if(await bcrypt.compare(password, user.password)){ //To verify plain text password with hashed password use bcrypt.compare(plainTextPassword, hashedPassword, callback) which also returns a promise if no callback is passed.

        //password match
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:'2h', //jwt.sign by default adds a iat (issued at claim), that has the same effect as the exp (in regards to changing the payload everytime when you generate a token). 
        });

        user = user.toObject();
        user.token = token; //add token in user object
        user.password = undefined; //pass hide from user object

        const options ={
            expires : new Date(Date.now()+ 3*24*60*60*1000), //3*24*60*60*1000 i.e. 3days
            httpOnly:true //an additional flag included in a Set-Cookie HTTP response header.
        }
        //server sends cookie as res to the client
        //cookie(cookie_name, which data you want to inserted in cookie, options)..//cookie stored in client side
        res.cookie('sachin_cookie', token, options).status(200).json({ 
            success: true,
            token,
            user,
            message: 'User Logged in successfully'
        })

        // res.status(200).json({ 
        //     success: true,
        //     token,
        //     user,
        //     message: 'User Logged in successfully'
        // })

        }else{
            //password do not match
            return res.status(403).json({
                success:false,
                message:"Password Incorrect"
            })
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Logging failure"
        })
    }
}
