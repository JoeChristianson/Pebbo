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

module.exports = {HabitDaySchema}