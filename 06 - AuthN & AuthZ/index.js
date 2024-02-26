const express = require('express');
const app = express();

require('dotenv').config();
const PORT= process.env.PORT || 4000;

app.use(express.json());

//route import and mount
const user = require("./routes/user")
app.use("/api/v1", user)

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`)
})

const { connectWithDB } = require('./config/database');
connectWithDB();

app.get("/", (req, res)=>{
    res.send(`<h1>This is my homepage baby</h1>`)
})