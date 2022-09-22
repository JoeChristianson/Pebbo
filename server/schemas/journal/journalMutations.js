// import { journalMutationArgType } = require("../../../custom-types/journal-types")

const {User,Journal} = require("../../models")


const journalMutations = {
    addJournalEntry:async (parent,{userId,date,text})=>{
        try{
            const user = await User.findById(userId)
            const entry = await Journal.create({date,text})
            user.journal.push(entry._id);
            user.save()
            return entry
        }catch(err){
            console.error(err)
        }
    }
}


module.exports = journalMutations