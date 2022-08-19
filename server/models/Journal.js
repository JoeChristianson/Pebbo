const {Schema,model} = require("mongoose")

const JournalSchema = new Schema({
    date:{
        type:Date
    },
    text:{
        type:String,
        required:true
    }
})

const Journal = model("Journal",JournalSchema)

module.exports = {Journal}