const {User,Habit}=require("../models")
const { HabitDay } = require("../models/HabitDay")
const { randBoolean } = require("../utils/math")
const mongoose = require("mongoose")

const createUser = async (parent,{name,email,password,birthdate})=>{
    const user = await User.create({name,email,password,birthdate})
    return user
}

const addHabit = async (parent,{name,prohibition,creator})=>{
    try{

        let habit = await Habit.find({name})
        const creatorId = mongoose.Types.ObjectId(creator)
        console.log(creatorId)
    console.log(mongoose.Types.ObjectId.isValid(creator))
    if (habit.length === 0){
        console.log("new habit")
        habit = await Habit.create({name,prohibition,creator:creatorId})
    }
    const user = await User.findById(creator);
    console.log(habit)
    user.habits.push(habit._id)
    user.save()
    console.log(user);
    habit = Habit.findById(habit._id).populate("creator")
    return habit
}catch(err){
    console.log(err)
}
}

const removeHabit = async (parent,{userId,habitId})=>{
    let user = await User.findById(userId);
    const habit = await Habit.findById(habitId)
    user.habits.pull(habit)
    await user.save();
    user = await User.findById(userId).populate("habits")
    return user
}

const populateDay = async (parent,{userId,date})=>{
    const user = await User.findById(userId).populate("habits");
    console.log(user)
    if(user.lastPopulated === date){
        return user
    }
    user.lastPopulated = date;
    await user.save()
    const habits = user.habits
    const habitDays = []
    for(let habit of habits){
        const habitDay = {
            date,habit:habit._id,isOn:randBoolean(.5),isComplete:false
        }
        habitDays.push(habitDay)
    }
    const day = {date,habitDays}
    console.log("day",day)
    user.days.push(day);
    user.save()
    return user;
}

const toggleHabitDay = async (parent,{userId,date,habitDayId})=>{
    const user = await User.findById(userId).populate({
        path: 'days.habitDays.habit',
        model: "Habit"
    });
    const dateSplit = date.split("/")
    const dateObj = {
        month:dateSplit[0],
        day:dateSplit[1],
        year:dateSplit[2]
    }
    let result = null
    for (let day of user.days){
        const dayStr = JSON.stringify(day.date)
        const splitSearchDate = dayStr.split("T")[0].split("-")
        const searchObj = {
            month:parseInt(splitSearchDate[1]),
            day:parseInt(splitSearchDate[2]),
            year:splitSearchDate[0].replace('"','')
        }
        let found = true
        for (let p in searchObj){
            if(parseInt(searchObj[p])!=parseInt(dateObj[p])){
                found = false
            }
        }
        if (found){
            console.log("found")
            result = day;
            for (let habitDay of day.habitDays){
                console.log(habitDay.habit._id)
                if (habitDay.habit._id.toString()===habitDayId){
                    console.log("found the habit too")
                    habitDay.isComplete=!habitDay.isComplete
                }
            }
        }
    }

    await user.save()
    return result
}

module.exports={createUser,addHabit,removeHabit,populateDay,toggleHabitDay}