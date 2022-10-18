const { findDay } = require("../../utils/date")
const { User } = require("../../models")

const passthruQueries = {
    getRenders: async (parent,{userId,date})=>{
        const user = await User.findById(userId).populate("assessments")
        const {lastReviewed,orientated,days} = user
        const assessmentDays = findDay(user,date).assessmentDays
        const res = {
            orientated:user.orientated,
            reviewItems:{
                queueItems:yesterdaysQueueItems(user),habits:yesterdaysHabits(user)
            },
            assessments:user.assessments.filter(assessment=>{
                return (assessmentDays.filter(ad=>ad.assessment.toString()===assessment._id.toString()).length===0)
            })
        }
        console.log(res);
        return "working"
    }
}

function yesterdaysQueueItems(user){
    if(!findDay(user,formatYesterday())){
        console.log("no yesterday");
        return []
    }
}

function yesterdaysHabits(user){
    if(!findDay(user,formatYesterday())){
        console.log("no yesterday");
        return []
    }
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