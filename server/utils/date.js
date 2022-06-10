const formatDBDateForComparison = (raw)=>{
    const yyyy = raw.getFullYear()
    const mm = raw.getMonth() + 1
    const dd = raw.getDate()
    const result = `${mm}/${dd}/${yyyy}`
    return result
}   

const findDay = (user,date)=>{
    return user.days.filter(d=>{
        return formatDBDateForComparison(d.date)===date})[0]
}

module.exports = {formatDBDateForComparison,findDay}