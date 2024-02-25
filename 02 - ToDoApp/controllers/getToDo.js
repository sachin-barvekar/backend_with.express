//import the model
const Todo = require("../models/ToDo");


//define route handler
exports.getToDo = async(req, res)=>{
    try{
        //fetch all todos from db
        const todos = await Todo.find();

        //response
        res.status(200).json({
            success:true,
            data:todos,
            message: "Entire Todo data is fetched"
        })
    }
    catch(err){
      console.error(err);
      res.status(500).json({
        success:false,
        error:err.message,
        message:"server error"
      })
    }
}

exports.getTodoById = async(req, res)=>{
    try{
      //extract todo item based on id
      const id = req.params.id;
      const todo = await Todo.findById({_id:id});

      //data for given id not found
      if(!todo){
        return res.status(404) //404: not found
        .json({
            success:false,
            message: "No Data Found with Given id"
        })
    }
        //data for given id found
        res.status(200).json({
            success: true,
            data: todo,
            message: `Todo ${id} data successfully fetched`
        })
    }
    catch(err){
      console.error(err);
      res.status(500).json({
        success:false,
        error:err.message,
        message:"server error"
      })
    }
}