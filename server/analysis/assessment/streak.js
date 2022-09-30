const {getAssessmentDayValue} = require("./helpers")

function findStreak (user,assessment){
    const id = assessment._id
    let streak = 0
    for(let i=user.days.length-1;i>=0;i--){
        const value = getAssessmentDayValue(user.days[i],id)
        if(value===1){
            streak++
        }else{break}      
    }
    return streak
}






module.exports = findStreak