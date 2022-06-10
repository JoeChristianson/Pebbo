const {Schema,model} = require("mongoose")

const AssessmentDaySchema = new Schema({
    date:{
        type:Date
    },
    assessment:{
        type:Schema.Types.ObjectId,
        ref:"Assessment"
    },
    value:{
        type:Number
    }

})

module.exports = {AssessmentDaySchema}