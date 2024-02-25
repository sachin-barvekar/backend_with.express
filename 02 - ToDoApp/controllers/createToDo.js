//import the model
const Todo = require("../models/ToDo");

//define route handler
exports.createToDo = async(req, res)=>{
    try{
        //extract title & desc from req body
        const {title, description} = req.body;
        //create a new todo obj and insert in db
        const response = await Todo.create({title, description});
        //send a json res with a success flag
        res.status(200).json( //200 code for ok success
            {
            success: true,
            data:response,
            message:'Entry Created Successfully'
        }
        );
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({ //500 code for error
            success:false,
            data:"internal server err",
            message: err.message,
        })
    }
}