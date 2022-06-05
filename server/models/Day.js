const {Schema, model} = require("mongoose")
const {HabitDaySchema} = require("./HabitDay")


const DaySchema = new Schema({
    date:{
        type:Date
    },
    habitDays:[HabitDaySchema],
})

// const Day = model("Day", DaySchema)

module.exports = {DaySchema}