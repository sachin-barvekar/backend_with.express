const express = require('express'); //require fun used for import
const app = express();

require("dotenv").config();
const PORT =process.env.PORT || 4000

//middleware to parse json req body
app.use(express.json());

//import routes for TODO API
const todoRoutes = require('./routes/todos');
//mount the todo API routes
app.use("/api/v1", todoRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})

//connection to the DB
const dbConnect = require('./config/Database');
dbConnect();

//default Route
app.get("/",(req, res)=>{
    res.send(`<h1>This is Home page baby</h1>`)
})
