const { calculateDaysBetween } = require("../../utils/date");
const {User} = require("../../models")
const findStreak = require("../../analysis/assessment/streak.js");
const findAverage = require("../../analysis/assessment/average");

const analyticsQueries = {
    getAllHabitsEffectsOnAssessment:async (parent,{userId,assessmentId})=>{
        const user = await User.findById(userId).populate({path:"days.assessmentDays.assessment",model:"Assessment"}).populate({path:"days.habitDays.habit",model:"Habit"});
        const days = user.days;
        const results = []
        for (let i=(days.length-1);i>0;i--){
            const assessmentDay = days[i].assessmentDays.find(a=>a.assessment._id.toString()==assessmentId)
            if(!assessmentDay){
                continue
            }else{
                const habitDays = days[i-1].habitDays;
                const daysBetween = calculateDaysBetween(days[i-1].date,days[i].date)
                if(daysBetween<-1){

                    continue
                }
                // there is going to be a function to only add the item if the two days are actually one day apart, it'll be like 
                const item = {value:assessmentDay.value,habits:habitDays.map(hd=>{
                    return {name:hd.habit.name,id:hd.habit._id,isOn:hd.isOn,isComplete:hd.isComplete}
                })}
                results.push(item)
            }
        }

        return results
    },
    quickStats: async (parent,{userId})=>{
        const user = await User.findById(userId).populate("assessments");
        const {assessments} = user;
        const streaks = []
        const averages = []
        assessments.forEach(assessment=>{
            if(assessment.metric==="boolean"){
                const number = findStreak(user,assessment)
                streaks.push({name:assessment.name,number})
            }else{
                const number = findAverage(user,assessment,10)
                averages.push({name:assessment.name,number})
            }
        })
        const res = {streaks,averages}

        return res
    }
}

module.exports = analyticsQueries