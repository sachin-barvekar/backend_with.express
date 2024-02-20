//import the model
const Todo = require("../models/ToDo");

//define route handler
exports.updateToDo = async(req, res)=>{
    try{
        //extract id from req body
        const {id} = req.params;
        
         //extract title & desc from req body
         const {title, description} = req.body;

        //update todo
        const todo = await Todo.findByIdAndUpdate(
            {_id: id},
            {title, description, updatedAt: Date.now()}
            );

        //send a json res with a success flag
        res.status(200).json( //200 code for ok success
            {
            success: true,
            data:todo,
            message:'Entry Updated Successfully'
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