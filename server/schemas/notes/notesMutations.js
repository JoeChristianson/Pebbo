const { User } = require("../../models")


const notesMutations = {
    addNoteToToDo: async (parent,{userId,toDoId,note})=>{
        try{
            const user = await User.findById(userId);
            const toDo = user.toDos.find(todo=>todo._id.toString()===toDoId)
            toDo.notes = note;
            user.save();
            return note
        }catch(err){
            console.error(err)
        }
    }
}

module.exports = {notesMutations}