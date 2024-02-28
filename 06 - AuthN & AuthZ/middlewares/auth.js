//auth, isStudent, isAdmin
const jwt = require('jsonwebtoken')
require('dotenv').config();

//check autheticity of the user
exports.auth =(req, res, next)=>{ //next used for call the next middleware
    try{
        //extract JWT token
        //other ways to fetch token: 1) req.body.token(payload mein pass kiya hoga) 2) req.cookies.cookies_name(required cookie-parser) 3) header(efficient method & secure)
        console.log("body", req.body.token )
        console.log("cookie",  req.cookies.sachin_cookie)
        console.log("header",req.header("Authorization"))
        const token =  req.body.token || req.cookies.sachin_cookie ||req.header("Authorization").replace("Bearer","");
        if(!token){
            return res.status(401).json({
                success: false,
                message: 'Token Missing',
            })
        }

        //verify the token
        try{
            //Decode the token using jwt verify method.. verify(token, jwt_secret_key)
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            
            //store the deoded token
            req.user = decode; 
        }catch(error){
            return res.status(401).json({
                success: false,
                message:'token is invalid'
            })
        }
        next(); //go to next middleware
    } catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went wrong, while verifying the token",
            error:error.message
        })
    }
}

//isStudent & isAdmin middlewares are used for authorization.
exports.isStudent =  (req, res, next)=>{
    try{
        if(req.user.role != "Student"){
            return res.status(401).json({
                success: false,
                message: 'This is a protected router for students'
            })
        }
        next();
    }catch(eror){
        return res.status(500).json({
            success:false,
            message:"User Role is not matching"
        })
    }
}

exports.isAdmin =  (req, res, next)=>{
    try{
        if(req.user.role != "Admin"){
            return res.status(401).json({
                success: false,
                message: 'This is a protected router for admin'
            })
        }
        next();
    }catch(eror){
        return res.status(500).json({
            success:false,
            message:"User Role is not matching"
        })
    }
}