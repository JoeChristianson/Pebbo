const {User, QueueItem} = require("../models")
const {formatDBDateForComparison} = require("../utils/date")
const { Assessment } = require("../models/Assessment")

const allUsers = async ()=>{
    let users = await User.find().populate("habits").populate({path:"queue.queueItem",model:"QueueItem"});
    return users
}


const getDay = async (parent,{userId,date})=>{
    console.log("in the day")
    
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
        console.log(searchObj)
        console.log(dateObj)
        for (let p in searchObj){
            if(parseInt(searchObj[p])!=parseInt(dateObj[p])){
                found = false
            }
        }
        if (found){
            console.log("day found",day)
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
            console.log(assessmentDay.assessment)
            console.log(assessment)
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
    console.log(user)
    return user
}

const getToDos = async (parent,{userId})=>{
    console.log("in it")
    const user = await User.findById(userId).populate({
        path:"toDos.toDoForm",
        model:"ToDoForm"
    });
    console.log(user)
    return user.toDos.filter(t=> !t.dateDone)
}

const getDailyQueue = async(parent,{userId,date})=>{
    const user = await User.findById(userId);
    const day = user.days.filter(day=>{
        console.log(date,formatDBDateForComparison(day.date))
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
        console.log(dailyQueue[i])
        const el = {ordinal:user.queue[i].ordinal,date:formatDBDateForComparison(dailyQueue[i].date),isOn:dailyQueue[i].isOn,isComplete:dailyQueue[i].isComplete,queueItem:queueItems[i]}
        result.push(el)
    }
    console.log(result)
    return result

}

const getDates = async (parent,{userId})=>{
    const user = await User.findById(userId);
    const {lastAssessed,lastPopulated,birthdate,lastReviewed} = user;
    const dates = {lastAssessed,lastPopulated,birthdate,lastReviewed};
    console.log(dates)
    for (let prop in dates){
        dates[prop] = formatDBDateForComparison(dates[prop])
    }
    return dates
}

module.exports = {getDates,feedAssessment,allUsers,getDay,getQueue,getToDos,getDailyQueue}