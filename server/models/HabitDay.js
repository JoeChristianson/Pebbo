const {Schema,model} = require("mongoose")

const HabitDaySchema = new Schema({
    date:{
        type:Date
    },
    habit:{
        type:Schema.Types.ObjectId,
        ref:"Habit"
    },
    isOn:{
        type:Boolean
    },
    isComplete:{
        type:Boolean
    }
})


// const HabitDay = model("HabitDay",HabitDaySchema)

module.exports = {HabitDaySchema}