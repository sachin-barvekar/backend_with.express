//import router
const express = require('express');
const router = express.Router();

//import controller
const {login, signup}= require('../controllers/Auth')
const {auth, isStudent, isAdmin}= require('../middlewares/auth')

//route mapping
router.post("/signup", signup);
router.post("/login", login);

//testing protected routes for single middleware
router.get("/test", auth, (req, res)=>{
    res.json({
        success: true,
        message: 'Welcome to the protected route for Test'
    })
})

//Protected Route
router.get("/student", auth, isStudent, (req, res)=>{
    res.json({
        success: true,
        message: 'Welcome to the protected route for Student'
    })
})

router.get("/admin", auth, isAdmin, (req, res)=>{
    res.json({
        success: true,
        message: 'Welcome to the protected route for Admin'
    })
})

module.exports = router;