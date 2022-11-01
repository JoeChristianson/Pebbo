const {findError} = require("../utils/errors.ts")
const { findDay, getDayOfWeek } = require("../utils/date")

const {User,Habit,QueueItem}=require("../models")
const { HabitDay } = require("../models/HabitDay")
const { randBoolean } = require("../utils/math")
const mongoose = require("mongoose")
const { AuthenticationError } = require("apollo-server-express")
const {signToken} = require("../utils/auth")
const {formatDBDateForComparison} = require("../utils/date")
const { Assessment } = require("../models/Assessment")
const { ToDoForm } = require("../models/ToDoForm")
const toDoMutations = require("./toDoMutations")
const queueMutations = require("./queueMutations")
const { settingMutations } = require("./settingMutations")
const {loadTutorialValues} = require("../utils/tutorial.ts")
const themeMutations = require("./themes/themeMutations")
const accountMutations = require("./accountSettings/accountMutations.js")


const mutations = {

    
    login: async (parent, { email, password }) => {
        try{
            
            const user = await User.findOne({ email });
            
            if (!user) {
                throw new AuthenticationError('No profile with this email found!');
            }
            
            const correctPw = await user.isCorrectPassword(password);
            
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }
            const token = signToken(user);
            return { token, user };
        }catch(err){
            throw new AuthenticationError(err)
        }
    }, 

    addHabit: async (parent,{name,prohibition,creator,date})=>{
        try{
            
            let habit = await Habit.findOne({name})
            console.log(habit);
            const creatorId = mongoose.Types.ObjectId(creator)
            
            if (!habit){
                
                habit = await Habit.create({name,prohibition,creator:creatorId})
            }
            const user = await User.findById(creator);
            if(!habit._id){
                throw "habit not formed correctly"
            }
            user.habits.push(habit._id)
            const day = findDay(user,date);
            day.habitDays.push({date,habit:habit._id,isOn:randBoolean(.5),isComplete:false})
            user.save()
            
            habit = Habit.findById(habit._id).populate("creator")
            return habit
        }catch(err){
            console.error(err)
        }
    },
    addToDo: async (parent,{name,creator,date})=>{
    try{
        let toDoForm = await ToDoForm.findOne({name})

        const creatorId = mongoose.Types.ObjectId(creator)
    if (!toDoForm){
        
        toDoForm = await ToDoForm.create({name,creator:creatorId})
    }
    const user = await User.findById(creator)
    user.toDos.push({toDoForm:toDoForm._id,dateCreated:date})
    user.save()
    toDoForm = ToDoForm.findById(toDoForm._id).populate("creator")
    return toDoForm
}catch(err){
    
}
},
addAssessment: async (parent,{userId,name,metric})=>{
    console.log("adding assessment!");
    let assessment = (await Assessment.find({name}))[0];
    
    if (!assessment){
        const creator = mongoose.Types.ObjectId(userId)
        assessment = await Assessment.create({name,metric,creator})
    }
    const user = await User.findById(userId)
    if (!user.assessments.includes(assessment._id)){
        user.assessments.push(assessment._id)
    }
    user.save();
    assessment = await Assessment.findById(assessment._id).populate("creator")
    return assessment
},
removeHabit: async (parent,{userId,habitId})=>{
    let user = await User.findById(userId);
    const habit = await Habit.findById(habitId)
    user.habits.pull(habit)
    await user.save();
    user = await User.findById(userId).populate("habits")
    return user
},
populateDay: async (parent,{userId,date})=>{
    try{
        
        const user = await User.findById(userId).populate("habits").populate("queue");
        if(user.lastPopulated && formatDBDateForComparison(user.lastPopulated) === date){
            
            return user
        }
        
        user.lastPopulated = date;
        await user.save()
        const habits = user.habits
        const habitDays = []
        for(let habit of habits){
            console.log(user.permanentHabits, habit._id);
            const isPermanent = user.permanentHabits.includes(habit._id)
            console.log(isPermanent);
            const habitDay = {
                date,habit:habit._id,isOn:(isPermanent?true:randBoolean(0)),isComplete:false
            }
            habitDays.push(habitDay)
        }
        const queue = user.queue;
        const queueDays = [];
        for (let q of queue){
            const queueDay = {
                date,queueItem:q.queueItem
            }
            queueDays.push(queueDay)
        }

        const environmentalVariables = [getDayOfWeek(user,date)]

        const day = {date,habitDays,queueDays,environmentalVariables}

        user.days.push(day);    


        await user.save()
        return user;
    }catch(err){
        console.error("this is the populate error",err)
    }
},
toggleHabitDay: async (parent,{userId,date,habitDayId})=>{
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
            
            result = day;
            for (let habitDay of day.habitDays){
                
                if (habitDay.habit._id.toString()===habitDayId){
                    
                    habitDay.isComplete=!habitDay.isComplete
                }
            }
        }
    }
    
    await user.save()
    return result
},
 toggleQueueDay: async (parent,{userId,date,queueDayId})=>{
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
            result = day;
            for (let queueDay of day.queueDays){
                
                if (queueDay._id.toString()===queueDayId){
                    
                    queueDay.isComplete=!queueDay.isComplete;
                    
                }
            }
        }
    }
    
    await user.save()
    return result
},
reorderQueue: async(parent,{userId,oldOrdinal,newOrdinal})=>{
    try{
        
        const user = await User.findById(userId);
        const {queue} = user
        queue.forEach(q=>{
            if (q.ordinal===oldOrdinal){
                q.ordinal=newOrdinal
            }
            else if(q.ordinal>oldOrdinal&&q.ordinal<=newOrdinal){
                q.ordinal=q.ordinal-1
            }
            else if(q.ordinal<oldOrdinal&&q.ordinal>=newOrdinal){
                q.ordinal=q.ordinal+1
            }
        })
        await    user.save()
        return user
    }catch(err){
        
    }
}
// ,
//  getQueueDay : async (parent,{userId,date})=>{
//     const user = await User.findById(userId);
//     const day = user.days.filter()
// }
,
 addQueueItem : async (parent,{name,userId,date})=>{
    try{
        const existing = await QueueItem.find({name});
        let queueItem = existing[0]?._id
        if(!queueItem){
            const newQueueItem = await QueueItem.create({name})
            queueItem = newQueueItem._id
        }
        const user = await User.findById(userId)
        const queue = user.queue;
        let ordinal = queue?.map(el=>el.ordinal).reduce((a,b)=>{
            return Math.max(a,b)
        },0) || 0
        user.queue.push({queueItem,ordinal:ordinal+1})
        const day = findDay(user,date);
        console.log("day",day);
            day.queueDays.push({
            date,queueItem,isOn:true,isComplete:false
        })
        await user.save()
        const result = await user.populate({path:"queue.queueItem",model:"QueueItem"})
        return result
    }catch(err){
        console.error(err)
    }
}
,
 removeQueueItem : async (parent,{userId,queueId,date})=>{
    const user  = await User.findByIdAndUpdate(userId,{
        $pull:{queue:{_id:queueId}}
    });
    return user
}


,
 makeAssessment : async (parent,{userId,date,assessmentId,value})=>{
    
    const user = await User.findById(userId);
    console.log("this is the user: ",user._id);
    const day = user.days.filter(d=>{
        console.log("these are the two dates");
        console.log(d.date,date);
        console.log("this is the first date reformatted: ",formatDBDateForComparison(d.date))
        return formatDBDateForComparison(d.date) === date
    })[0];
    console.log("this is the day",day);
    const assessmentDay = {date,assessment:assessmentId,value};
    day.assessmentDays.push(assessmentDay);
    user.save();
    return day
}
,
 completeToDo : async (parent,{userId,toDoId,date})=>{
    try{
        
        const user = await User.findById(userId);
        const toDo = user.toDos.filter(t=>{
            return t._id.toString()===toDoId
        })[0]
        toDo.dateDone = date;
        await user.save()
        return "Done"
    }catch(err){
        
    }
    
}
,
 completeQueueItem : async (parent,{date,name,userId})=>{
    const user = await User.findById(userId).populate({
        path:"days.queueDays.queueItem"
    });
    const day = user.days.filter(d=>{
        return formatDBDateForComparison(d.date)===date})[0]
        const queueItemDay = day.queueDays.filter(d=>{
            
            return (d.queueItem.name===name)
        })[0]
        
        queueItemDay.isComplete = !queueItemDay.isComplete;
        user.save()
        return "Done" 
    }
    ,
     deleteQueueItem : async (parent,{userId,queueItemId,date})=>{
        // get user
        const user = await User.findById(userId);
        const queue = user.queue;
        user.queue = queue.filter(q=>{
            return q.queueItem.toString()!==queueItemId});
            const day = findDay(user,date);
            
            day.queueDays = day.queueDays.filter(q=>{
                
                return q.queueItem.toString()!==queueItemId
            })
            user.save();
            return "deleted"
        }
        ,
         confirmDay : async (parent,{userId,date})=>{
            const user = await User.findById(userId);
            user.lastReviewed = date;
            user.save()
            return "confirmed"
        }
        ,
         deleteToDo : async (parent,{userId,toDoId})=>{
            const user = await User.findById(userId);
            // user.toDos is an array can delete by _id
            user.toDos.pull({_id:toDoId})
            user.save()
            return "success"
        },
        deleteHabit: async (parent,{userId,habitId,date})=>{
            const user = await User.findById(userId);
            // user.toDos is an array can delete by _id
            user.habits.pull({_id:habitId})
            const day = findDay(user,date);
            day.habitDays = day.habitDays.filter(h=>{
                
                return h.habit.toString()!==habitId
            })
            user.save()
            return "success"
        },
        deleteAssessment: async (parent,{userId,assessmentId})=>{
            const user = await User.findById(userId);
            // user.toDos is an array can delete by _id
            user.assessments.pull({_id:assessmentId})
            user.save()
            return "success"
        },
        ...toDoMutations,
        ...queueMutations,
        ...settingMutations,
        ...themeMutations,
        ...accountMutations
    }

module.exports=mutations