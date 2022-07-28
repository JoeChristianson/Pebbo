const {User, QueueItem} = require("../models")
const {formatDBDateForComparison, findDay} = require("../utils/date")
const { Assessment } = require("../models/Assessment")

const allUsers = async ()=>{
    let users = await User.find().populate("habits").populate({path:"queue.queueItem",model:"QueueItem"});
    return users
}


const getDay = async (parent,{userId,date})=>{
    
    
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

    for(let day of user.days){
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
            
            return day
        }


    }
    return null
}

const feedAssessment = async (parent,{userId,date})=>{
    const user = await User.findById(userId);
    
    const day = user.days.filter(d=>{
        return formatDBDateForComparison(d.date) === date
    })[0]
    for (let assessment of user.assessments){
        let found = false;
        for (let assessmentDay of day.assessmentDays){
            
            
            if(assessmentDay.assessment.toString()===assessment.toString()){
                found=true
            }
        }
        if (found===false){
            
            const result = await Assessment.findById(assessment)
            
            return result
        }
    }
}

const getQueue = async (parent,{userId})=>{
    const user = await User.findById(userId).populate({path:"queue.queueItem",model:"QueueItem"});
    
    return user
}

const getToDos = async (parent,{userId})=>{
    
    const user = await User.findById(userId).populate({
        path:"toDos.toDoForm",
        model:"ToDoForm"
    });
    
    return user.toDos.filter(t=> !t.dateDone)
}

const getDailyQueue = async(parent,{userId,date})=>{
    const user = await User.findById(userId);
    const day = user.days.filter(day=>{
        
        return (date === formatDBDateForComparison(day.date))
    })[0];
    const dailyQueue = day.queueDays;
    const queueItems = [];
    for (let queueDay of dailyQueue){
        const queueItem = await QueueItem.findById(queueDay.queueItem);
        queueItems.push(queueItem)
    }
    const result = []
    for (let i = 0;i<queueItems.length;i++){
        
        const el = {ordinal:user.queue[i].ordinal,date:formatDBDateForComparison(dailyQueue[i].date),isOn:dailyQueue[i].isOn,isComplete:dailyQueue[i].isComplete,queueItem:queueItems[i]}
        result.push(el)
    }
    
    return result

}

const getDates = async (parent,{userId})=>{
    const user = await User.findById(userId);
    const {lastAssessed,lastPopulated,birthdate,lastReviewed} = user;
    const dates = {lastAssessed,lastPopulated,birthdate,lastReviewed};
    
    for (let prop in dates){
        dates[prop] = formatDBDateForComparison(dates[prop])
    }
    return dates
}

const getAllUsersAssessments = async (parent,{userId})=>{
    const user = await User.findById(userId).populate("assessments");
    
    return user.assessments;
}

const getReview = async (parent,{userId,date})=>{
    const user = await User.findById(userId).populate({
        path:"days.habitDays.habit",
        model:"Habit"
    }).populate({
        path:"days.queueDays.queueItem",
        model:"QueueItem"
    });
    const day = findDay(user,date)
    return day
}

const getDash = async (parent,{userId,date})=>{
    const user = await User.findById(userId).populate({
        path:"days.habitDays.habit",
        model:"Habit"
    }).populate({
        path:"days.queueDays.queueItem",
        model:"QueueItem"
    }).populate({
        path:"toDos.toDoForm",
        model:"ToDoForm"
    });
    let {habitDays,queueDays} = findDay(user,date);
    const queueDay = queueDays.filter(q=>{
        return !q.isComplete
    })[0]
    habitDays = habitDays.filter(h=>h.isOn)

    const toDo = user.toDos.filter(t=>{
        return !t.dateDone
    })[0]
    const result = {
        toDos:toDo?[toDo]:[],
        queueDays:queueDay?[queueDay]:[],
        habitDays:[...habitDays]
    }
    return result
}



module.exports = {getDash,getReview,getAllUsersAssessments,getDates,feedAssessment,allUsers,getDay,getQueue,getToDos,getDailyQueue}