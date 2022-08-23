const { Schema } = require( "mongoose");

const subTaskSchema = new Schema({
    toDoForm:{
        type:Schema.Types.ObjectId,
        ref:"ToDoForm",
    },
    dateCreated:Date,
    dateDone:Date
})


const ToDoSchema = new Schema({
    toDoForm:{
        type:Schema.Types.ObjectId,
        ref:"ToDoForm"
    },
    dateCreated:Date,
    dateDone:Date,
    priority:Number,
    notes:String,
    subTasks:[subTaskSchema]
})

module.exports = {ToDoSchema}

