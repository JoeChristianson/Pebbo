const {Schema,model} = require("mongoose")

const QueueSchema = new Schema({
    queueItem:{
        type:Schema.Types.ObjectId,
        ref:"QueueItem",
        required:true,
    },
    ordinal:{
        type:Number,
        required:true
    }
})

module.exports = {QueueSchema}