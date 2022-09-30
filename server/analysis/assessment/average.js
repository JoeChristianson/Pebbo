const {getAssessmentDayValue} = require("./helpers")

function findAverage (user,assessment,numberOfDays){
    const id = assessment._id
    const values = []
    const totalDays = user.days.length
    for(let i=totalDays-1;i>=0&&i>=totalDays-numberOfDays;i--){
        const value = getAssessmentDayValue(user.days[i],id)
        if(value!==undefined){
            values.push(value)
        }else{break}      
    }
    const average = values.reduce((a,b)=>a+b,0)/values.length
    return average
}






module.exports = findAverage