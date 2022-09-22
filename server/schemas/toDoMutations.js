const { ToDoForm } = require("../models/ToDoForm");
const {User} = require("../models");
const { ObjectID } = require("bson");

const toDoMutations = {

    prioritizeToDo: async (parent,{userId,toDoId,priority})=>{
        try{
            
            const user = await User.findById(userId);
            const toDo = user.toDos.filter(t=>{
                return t._id.toString()===toDoId
            })[0];
            toDo.priority = priority;
            await user.save()
            return "Done"
        }catch(err){
            
        }
    },
    addSubTask: async (parent,{userId,toDoId,name,date})=>{
        try{
            const user = await User.findById(userId);
            const toDo = user.toDos.find(t=>{
                return t._id.toString()===toDoId
            });
            let subTaskForm = await ToDoForm.findOne({name})
            if(!subTaskForm){
                subTaskForm = await ToDoForm.create({name,creator:userId})
            }
            const id = new ObjectID()
            const subTask = {toDoForm:subTaskForm._id,dateCreated:date,dateDone:null,_id:id}
            toDo.subTasks.push(subTask);
            await user.save()
            return {toDoForm:subTaskForm,dateCreated:date,dateDone:null,_id:id}
        }catch(err){
            console.error(err)
        }
    },
    completeSubTask: async (parent,{userId,toDoId,subtaskId,date})=>{
        const user = await User.findById(userId);
        const toDo = user.toDos.find(t=>{
            return t._id.toString()===toDoId
        });
        const subTask = toDo.subTasks.find(s=>{
            return (s._id.toString()===subtaskId)
        });
        subTask.dateDone = date;
        user.save();
        return "Success"
    }

}

module.exports = toDoMutations