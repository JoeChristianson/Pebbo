const {User,Habit,QueueItem}=require("../models")
const { HabitDay } = require("../models/HabitDay")
const { randBoolean } = require("../utils/math")
const mongoose = require("mongoose")
const { AuthenticationError } = require("apollo-server-express")
const {signToken} = require("../utils/auth")
const {formatDBDateForComparison} = require("../utils/date")

const login = async (parent, { email, password }) => {
    try{

        console.log("in it")
        console.log({email,password})
        const user = await User.findOne({ email });
        
    if (!user) {
        throw new AuthenticationError('No profile with this email found!');
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      throw new AuthenticationError('Incorrect password!');
    }
    console.log(user)
    const token = signToken(user);
    return { token, user };
}catch(err){
    throw new AuthenticationError(err)
}
  }


const createUser = async (parent,{name,email,password,birthdate})=>{
    console.log({name,email,password,birthdate})
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
    if(user.lastPopulated && formatDBDateForComparison(user.lastPopulated) === date){
        console.log("already populated")
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

const addQueueItem = async (parent,{name,userId})=>{
    const existing = await QueueItem.find({name});
    console.log(existing)
    let queueItem = existing[0]?._id
    if(!queueItem){
    const newQueueItem = await QueueItem.create({name})
    }
    console.log(queueItem)
    const user = await User.findById(userId)
    const queue = user.queue;
    console.log(queue)
    let ordinal = queue.map(el=>el.ordinal).reduce((a,b)=>{
        return Math.max(a,b)
    },0)
    console.log(ordinal)
    user.queue.push({queueItem,ordinal:ordinal+1})
    await user.save()
    const result = await user.populate({path:"queue.queueItem",model:"QueueItem"})
    console.log(result)
    return result
}

const removeQueueItem = async (parent,{userId,queueId})=>{
    const user  = await User.findByIdAndUpdate(userId,{
        $pull:{queue:{_id:queueId}}
    });
    return user
}


module.exports={removeQueueItem,addQueueItem,login,createUser,addHabit,removeHabit,populateDay,toggleHabitDay}