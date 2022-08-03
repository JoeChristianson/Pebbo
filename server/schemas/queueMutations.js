const {User} = require("../models");
const { findDay } = require("../utils/date");

const queueMutations = {
    skipQueueItem: async(parent,{userId,date,queueItem})=>{
        try{
            const user = await User.findById(userId).populate({
                path:"days.queueDays.queueItem"
            });;
            const {queueDays} = findDay(user,date);
            const queueDay = queueDays.find(queueDay =>{
                return queueDay.queueItem.id.toString() === queueItem
            })
            queueDay.skips++
            await user.save()

            return queueDay
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = queueMutations