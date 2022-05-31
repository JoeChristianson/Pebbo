const {Schema,model} = require("mongoose")

const HabitSchema = new Schema({
    name: {
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    prohibition:{
        type:Boolean,
        default:false
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

const Habit = model("Habit",HabitSchema)

module.exports = {Habit}