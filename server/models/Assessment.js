const {Schema,model} = require("mongoose");

const AssessmentSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    metric:{
        type:String
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

const Assessment = model("Assessment",AssessmentSchema)

module.exports = {Assessment}