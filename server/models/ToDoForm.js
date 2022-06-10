const {Schema,model} = require("mongoose")

const ToDoFormSchema = new Schema({
    name:String,
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

const ToDoForm = model("ToDoForm",ToDoFormSchema)

module.exports = {ToDoForm}