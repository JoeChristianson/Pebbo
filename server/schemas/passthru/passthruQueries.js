const { findDay, calculateDaysBetween } = require("../../utils/date")
const { User } = require("../../models")
const { populateDay } = require("../mutations")

const passthruQueries = {
    getRenders: async (parent,{userId,date})=>{




        const user = await User.findById(userId).populate("assessments").populate({path:"days.queueDays.queueItem",model:"QueueItem"}).populate({path:"days.habitDays.habit",model:"Habit"})
        const {lastReviewed,orientated,days} = user

        // let's check to see if today exists
        if(!findDay(user,date)){
            await populateDay(parent,userId,date)
        }
        console.log("day",findDay(user,date));
        const assessmentDays = findDay(user,date)?.assessmentDays || []
        let assessments = []
        if(user.assessments.length!==assessmentDays.length){
            assessments = user.assessments
            if(findDay(user,date)){
                findDay(user,date).assessmentDays = []
            }
            
        }
        await user.save()
        const res = {
            orientated:user.orientated,
            reviewItems:{
                queueItems:yesterdaysQueueItems(user),                
                habits:yesterdaysHabits(user)
            },
            assessments
        }
        const daysSinceLastReview = calculateDaysBetween(date,user.lastReviewed)
        if(daysSinceLastReview===0){
            res.reviewItems = {queueItems:[],habits:[]}
        }
        return res
    }
}


function yesterdaysQueueItems(user){
    const yesterday = findDay(user,formatYesterday())
    if(!yesterday){
        return []
    }
    return yesterday.queueDays
}

function yesterdaysHabits(user){
    const yesterday = findDay(user,formatYesterday())
    if(!yesterday){
        return []
    }
    return yesterday.habitDays
}

function formatYesterday(){
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1)
    const yyyy = yesterday.getFullYear();
    let mm = yesterday.getMonth() + 1;
    let dd = yesterday.getDate();
    yesterday = mm + '/' + dd + '/' + yyyy;
    return yesterday
}


module.exports = passthruQueries