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
    },
    offSettings:[{
        type:Schema.Types.ObjectId,
        ref:"Setting"
    }],
    note:{
        type:String,
        default:"TEST NOTE!!!"
    }
})

module.exports = {QueueSchema}