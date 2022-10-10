
const { calculateDaysBetween, formatDBDateForComparison } = require('../utils/date');
const { User } = require('../models');
const sendText = require('./sendText');

const main = async ()=>{
// get last updated for all Users
    const users = await User.find({})
    const tardy = []
    for (let user of users){
        if(!user.lastPopulated||!user.phone){
            continue
        }
        const lastUpdated = formatDBDateForComparison(user.updated_at)
        const dayDiff = calculateDaysBetween(lastUpdated)
        console.log(dayDiff);
        if(dayDiff>-1&&dayDiff<-.3){
            console.log("up to date");
            continue
        }
        tardy.push(user)
    }
    


    for(let user of tardy){
        const message = `Good morning, ${user.name} - It's time to log in and review yesterday - Sincerely, your Pebbo Bot`
        sendText(user.phone,message)
    }


}

module.exports = main