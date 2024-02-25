const express = require('express'); //require- used for import the module
const app = express(); //express()- create instance of express i.e. used for creating application.
const port = 3000; //port is used for communicate with server.


//adding middleware
//middleware fun can be used to perform variety of tasks such as logging, authentication, parsig, error handling
//app.use is used for adding middleware
app.use(express.json()); //express.json is used for body parser

//adding routing - route determine application responds
//app.method(path, handler)
app.get("/", (req, res)=>{
    res.send(`<h1>This is my homepage baby</h1>`)
})

app.post("/car", (req, res)=>{
    res.send(`This is my post req baby`)
})
//app.listen(port no, callback fun)
app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})