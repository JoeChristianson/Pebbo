const {Schema,model} = require('mongoose')

const QueueDaySchema = new Schema({
    date:{
        type:Date
    },
    queueItem:{
        type:Schema.Types.ObjectId,
        ref:"QueueItem"
    },
    isOn:{
        type:Boolean,
        default:true
    },
    isComplete:{
        type:Boolean,
        default:false
    },
    skips:{
        type:Number,
        default:0
    }
})

module.exports = {QueueDaySchema}