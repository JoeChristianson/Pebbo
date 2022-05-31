const {User,Habit}=require("../models")

const createUser = async (parent,{name,email,password,birthdate})=>{
    const user = await User.create({name,email,password,birthdate})
    return user
}

const addHabit = async (parent,{name,prohibition,creator})=>{
    let habit = await Habit.find({name})
    if (habit.length === 0){
        console.log("new habit")
        habit = await Habit.create({name,prohibition,creator})
    }
    const user = await User.findById(creator);
    user.habits.push(habit)
    user.save()
    console.log(user);
    habit = Habit.findById(habit._id).populate("creator")
    return habit
}

const removeHabit = async (parent,{userId,habitId})=>{
    let user = await User.findById(userId);
    const habit = await Habit.findById(habitId)
    user.habits.pull(habit)
    await user.save();
    user = await User.findById(userId).populate("habits")
    return user
}

module.exports={createUser,addHabit,removeHabit}