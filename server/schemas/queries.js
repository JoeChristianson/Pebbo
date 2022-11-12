const {User, QueueItem} = require("../models")
const {formatDBDateForComparison, findDay} = require("../utils/date")
const {queueItemActive} = require("../utils/settings")
const { Assessment } = require("../models/Assessment");
const { queueItemCompletionRate } = require("../analysis/queue/completion");
const { compareIds } = require("../utils/comparisons");


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
            day.habitDays.forEach(hd=>{
                hd.habit.isPermanent = false;
                const habitId = hd.habit._id;
                for(let permanentHabits of user.permanentHabits){
                    if (compareIds(permanentHabits._id,habitId)){
                        hd.habit.isPermanent = true;
                    }
                }
                console.log(habitId);
            })
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
    try{

        const user = await User.findById(userId).populate({path:"queue.queueItem",model:"QueueItem"});
        
        return user
    }catch(err){
        console.error(err)
    }
}

const getToDos = async (parent,{userId})=>{
    
    const user = await User.findById(userId).populate({
        path:"toDos.toDoForm",
        model:"ToDoForm"
    }).populate({
        path:"toDos.subTasks.toDoForm",
        model:"ToDoForm"
    });
    return user.toDos.filter(t=> !t.dateDone)
}

const getDailyQueue = async(parent,{userId,date})=>{
    const user = await User.findById(userId);
    const day = user.days.filter(day=>{
        return (date === formatDBDateForComparison(day.date))
    })[0];
    let dailyQueue = day.queueDays;
    dailyQueue = addNotes(dailyQueue)
    const queueItems = [];
    for (let queueDay of dailyQueue){
        const queueItem = await QueueItem.findById(queueDay.queueItem);
        queueItemActive(day,queueItem,user.queue)
        queueItems.push(queueItem)
    }
    const result = []
    for (let i = 0;i<queueItems.length;i++){
        
        const el = {note:user.queue[i].note,ordinal:user.queue[i].ordinal,date:formatDBDateForComparison(dailyQueue[i].date),isOn:dailyQueue[i].isOn,isComplete:dailyQueue[i].isComplete,queueItem:queueItems[i]}
        const stats = await queueItemCompletionRate(userId,user.queue[i].queueItem.toString())
        result.push({...el,...stats})
    }
    
    return result

}

const getDates = async (parent,{userId})=>{
    try{

        const user = await User.findById(userId);
        const {orientated,lastAssessed,lastPopulated,birthdate,lastReviewed,lastSetting,settings} = user;
        const dates = {orientated,settings,lastAssessed,lastPopulated,birthdate,lastReviewed,lastSetting};
        for (let prop in dates){
            if (prop!=="settings"||prop!=="orientated"){
                dates[prop] = formatDBDateForComparison(dates[prop])
            }
        }
        dates.orientated = orientated||false
        if(!Array.isArray(dates.settings)){
            dates.settings = []
        }
        return dates
    }catch(err){
        console.error(err)
    }
}

const getAllUsersAssessments = async (parent,{userId})=>{
    const user = await User.findById(userId).populate("assessments");
    
    return user.assessments;
}

const getReview = async (parent,{userId,date})=>{
    try{

        const user = await User.findById(userId)
        .populate({
            path:"days.habitDays.habit",
            model:"Habit"
        })
        .populate({
            path:"days.queueDays.queueItem",
            model:"QueueItem"
        });
        const day = findDay(user,date)

        return day
    }catch(err){
        console.error(err)
    }
}

const getDash = async (parent,{userId,date})=>{
    try{
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
        let {habitDays,queueDays} = findDay(user,date) || {habitDays:[],queueDays:[]};
        let incompleteQueueDays = [...queueDays.filter(q=>{
            return !q.isComplete
        })]
        incompleteQueueDays = incompleteQueueDays.map((qd)=>{
            const {ordinal} = user.queue.find((qi)=>{
                return qi.queueItem.toString()===qd.queueItem._id.toString()})
            return {
                date:qd.date,
                queueItem:qd.queueItem,
                isOn:qd.isOn,
                isComplete:qd.isComplete,
                skips:qd.skips,
                _id:qd._id,
                ordinal
            }
        })

        let queueItemLowestAdjustedIndex = null;
        let queueItemIndex = null
        incompleteQueueDays.forEach((queueItem,index)=>{
            if(queueItemIndex===null||((((queueItem?.skips||0)*1.1)+queueItem.ordinal)<queueItemLowestAdjustedIndex)){
                queueItemLowestAdjustedIndex = (((queueItem?.skips||0)*1.1)+queueItem.ordinal)
                queueItemIndex = index

            }else{
                // console.error("not low enough",queueItem)
            }
        })
        
        habitDays = habitDays.filter(h=>h.isOn)
        
        const toDo = user.toDos.filter(t=>{
            return !t.dateDone
        })[0]
        const result = {
            toDos:toDo?[toDo]:[],
            queueDays:incompleteQueueDays.length>0?[incompleteQueueDays[queueItemIndex]]:[],
            habitDays:[...habitDays]
        }
        return result
    }catch(err){
        console.error(err)
    }
}

function addNotes(queue){
    return queue
}

module.exports = {getDash,getReview,getAllUsersAssessments,getDates,feedAssessment,allUsers,getDay,getQueue,getToDos,getDailyQueue}