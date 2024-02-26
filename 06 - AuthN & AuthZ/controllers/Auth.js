const bcrypt = require('bcryptjs');
const User = require('../models/User');

//signup route handler
exports.signup = async(req, res)=>{
    try{
        //get data
        const {name, email, password, role}=req.body;
        //check if user already exist
        const existingUser = await User.findOne({email});
        //if user already exist then return response
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already Exists"
            })
        }

        //secure/ hash the password
        let hashedPassword;
        try{
            //successful in hash password
            hashedPassword = await bcrypt.hash(password, 10); //hash(kisko hash krna hai, salt/noofrounds) used for secure the password
        }
        catch(err){
            //error in hash password
            return res.status(500).json({
                success: false,
                message: "Error in hashing password"
            })
        }

        //create entry for user in DB
        const user = await User.create({
            name,email, password:hashedPassword, role
        })
        // RETURN RES
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
