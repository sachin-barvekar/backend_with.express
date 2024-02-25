//import the model
const Todo = require("../models/ToDo");

//define route handler
exports.deleteToDo = async(req, res)=>{
    try{
        //extract id from req body
        const {id} = req.params;
    
        //delete todo
        const todo = await Todo.findByIdAndDelete(id);

        //send a json res with a success flag
        res.status(200).json( //200 code for ok success
            {
            success: true,
            message:'Entry Deleted Successfully'
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