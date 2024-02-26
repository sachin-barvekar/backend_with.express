const mongoose = require('mongoose');
require('dotenv').config();

exports.connectWithDB = () =>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("Connection with DB is Successful"))
    .catch((error)=>{
        console.log("Issue in DB Connection");
        console.error(error);
        process.exit(1);
    })
}