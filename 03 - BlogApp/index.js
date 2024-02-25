const express = require('express'); //require fun used for import
const app = express();

require('dotenv').config();
const PORT =process.env.PORT || 4000

//middleware
app.use(express.json());

//import routes
const blogRoutes = require('./routes/blog');
//mount routes
app.use("/api/v1", blogRoutes);

//connection to DB
const dbConnect = require('./config/db');
dbConnect();

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})

//default Route
app.get("/",(req, res)=>{
    res.send(`<h1>This is My Home page baby</h1>`)
})