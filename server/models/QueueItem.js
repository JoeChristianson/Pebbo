const {Schema,model} = require("mongoose")

const QueueItemSchema = new Schema({
    name: {
        type:String,
        required:true,
        unique:true,
        trim:true
    }
})

const QueueItem = model("QueueItem",QueueItemSchema)

module.exports = {QueueItem}