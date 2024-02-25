//index.js is entry file

//server instantiate
const express = require('express');
const app = express();

//middleware
const bodyParser = require('body-parser') //used to parse req.body in express -> in the put or post case
app.use(bodyParser.json()); //specifically parse json data and add it to req.body object.

//routes
app.get('/',(req, res)=>{
    res.send("Hello jee, kaise ho saree")
});

app.post('/api/cars',(req, res)=>{
    const{name, brand} = req.body; //destructuring
    console.log(name)
    console.log(brand)
    res.send("car submmited successfully")
})

const mongoose = require('mongoose');
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Canteen')
.then(() => {
    console.log("MongoDB connected successfully")
}).catch((error) => {
    console.error("Error connecting to MongoDB:")
});


//activate the server on 8080 port
app.listen(8080,()=>{
    console.log("server started at port no. 8080"); //port, behaviour
})