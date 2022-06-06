const {User} = require("../models")


const allUsers = async ()=>{
    let users = await User.find().populate("habits");
    return users
}


const getDay = async (parent,{userId,date})=>{
    const user = await User.findById(userId).populate({
        path: 'days.habitDays.habit',
        model: "Habit"
    });
    const dateSplit = date.split("/")
    const dateObj = {
        month:dateSplit[0],
        day:dateSplit[1],
        year:dateSplit[2]
    }

    for(let day of user.days){
        const dayStr = JSON.stringify(day.date)
        const splitSearchDate = dayStr.split("T")[0].split("-")
        const searchObj = {
            month:parseInt(splitSearchDate[1]),
            day:parseInt(splitSearchDate[2]),
            year:splitSearchDate[0].replace('"','')
        }
        let found = true
        console.log(searchObj)
        console.log(dateObj)
        for (let p in searchObj){
            if(parseInt(searchObj[p])!=parseInt(dateObj[p])){
                found = false
            }
        }
        if (found){
            console.log("day found",day)
            return day
        }


    }
    return null
}


module.exports = {allUsers,getDay}