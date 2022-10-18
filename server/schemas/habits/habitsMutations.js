const {User} = require("../../models/index.js")
const mongoose = require("mongoose")

const habitMutations = {
    makeHabitPermanent: async (parent,{userId,habitId})=>{
        try{

            const user = await User.findById(userId)
            const habit = user.habits.find(h=>h.toString()===habitId)
            console.log(habit);
            user.permanentHabits.push(habit)
            await user.save()
            return "success"
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = habitMutations