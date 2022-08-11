const {Schema, model} = require("mongoose")
const {HabitDaySchema} = require("./HabitDay")
const {QueueDaySchema} = require("./QueueDay")
const {AssessmentDaySchema} = require("./AssessmentDay")

const DaySchema = new Schema({
    date:{
        type:Date
    },
    habitDays:[HabitDaySchema],
    queueDays:[QueueDaySchema],
    assessmentDays:[AssessmentDaySchema],
    environmentalVariables:[String]
})

module.exports = {DaySchema}