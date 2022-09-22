const { User } = require("../../models");

const queueItemCompletionRate = async (userId,queueItemId)=>{
    const user = await User.findById(userId);
    let attempts = 0;
    let successes = 0;
    user.days.forEach(day=>{
        const res = day.queueDays.find(qd=>{
            return qd.queueItem.toString()===queueItemId})
        if(res){
            res.isOn && attempts++
            res.isComplete && successes++
        }
    })
    return {attempts,successes}
}

module.exports = {queueItemCompletionRate}