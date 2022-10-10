const formatDBDateForComparison = (raw)=>{
    try{
        const yyyy = raw.getFullYear()
        const mm = raw.getMonth() + 1
        const dd = raw.getDate()
        const result = `${mm}/${dd}/${yyyy}`
        return result
    }catch(err){
        return "none"
    }
}   

const findDay = (user,date)=>{

    return user.days.filter(d=>{
        return formatDBDateForComparison(d.date)===date})[0]
}

const getDayOfWeek = (user,date)=>{
    return (new Date(date)).getDay()
}

const calculateDaysBetween = (date1,date2)=>{
    const dateObj1 = new Date(date1);
    let dateObj2
    if(date2){
        dateObj2 = new Date(date2)
    }else{
        dateObj2 = new Date()
    }
    const timeDiff = dateObj1.getTime()-dateObj2.getTime()
    const dayDiff = timeDiff/(1000*60*60*24)
    return dayDiff
}


module.exports = {formatDBDateForComparison,findDay,getDayOfWeek,calculateDaysBetween}