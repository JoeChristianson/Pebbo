
const { User } = require("../../models");



const journalQueries = {
    getAllJournalEntries:async (parent,{userId})=>{
        try{
            const user = await User.findById(userId).populate("journal")
            return user.journal
        }catch(err){
            console.error(err);     
        }
    }
}

module.exports = journalQueries