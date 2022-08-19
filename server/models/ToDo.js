const { Schema } = require( "mongoose");

const ToDoSchema = new Schema({
    toDoForm:{
        type:Schema.Types.ObjectId,
        ref:"ToDoForm"
    },
    dateCreated:Date,
    dateDone:Date,
    priority:Number,
    notes:String
})

module.exports = {ToDoSchema}