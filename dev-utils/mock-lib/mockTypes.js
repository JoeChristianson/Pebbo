const invalidType = []

const weekday = [
    "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
]

const numericalDate = []
for(let i=0;i<100;i++){
    const date = new Date(Math.floor(Math.random()*1663196314743))
    numericalDate.push(`${date.getMonth()+1}-${date.getDay()}-${date.getFullYear()}`)
}

module.exports = {weekday,numericalDate}