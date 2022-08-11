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


module.exports = {formatDBDateForComparison,findDay,getDayOfWeek}