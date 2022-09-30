function getAssessmentDayValue(day,assessmentId){
    const assessmentDay = day.assessmentDays.find((a)=>{
        return a.assessment.toString()==assessmentId.toString()}
        );
        return assessmentDay?.value
}

module.exports = {getAssessmentDayValue}