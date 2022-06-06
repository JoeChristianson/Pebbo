const formatDBDateForComparison = (raw)=>{
    const yyyy = raw.getFullYear()
    const mm = raw.getMonth() + 1
    const dd = raw.getDate()
    const result = `${mm}/${dd}/${yyyy}`
    return result
}   

module.exports = {formatDBDateForComparison}