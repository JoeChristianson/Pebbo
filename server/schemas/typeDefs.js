const {gql} = require("apollo-server-express")

const typeDefs = gql`
    type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    birthdate: String!
    habits:[Habit]
    lastPopulated:String
    days: [Day]
    queue:[Queue]
    assessments:[Assessment]
    toDos:[ToDo]
    lastReviewed:String
    lastAssessed:String
  }



  type Dash {
    toDos:[ToDo]
    queueDays:[QueueDay]
    habitDays:[HabitDay]
  }

  type toDoForm {
    _id: ID!
    name: String
    creator: ID!

  }

  type Dates {
    lastAssessed:String
    lastPopulated:String
    birthdate:String
    lastReviewed:String
    lastSetting:String
    settings:[ID]
    orientated:String
  }

  type SubTask {
    toDoForm: ToDoForm
    dateCreated: String
    dateDone: String
    _id:ID
  }

  type ToDo {
    _id: ID!
    toDoForm: ToDoForm
    dateCreated: String
    dateDone: String
    priority:Int
    notes:String
    subTasks:[SubTask]
  }

  type Setting{
    name:String
    id:ID
  }

  type Queue {
    queueItem: QueueItem
    ordinal: Int
    offSettings:[
      Setting
    ]
    onSettings:[
      Setting
    ]
  }

  type QueueItem {
    name: String!
  }

  type QueueDay {
    date: String!
    queueItem: QueueItem!
    isOn: Boolean!
    isComplete: Boolean!
    ordinal: Int
    skips:Int
    attempts:Int
    successes:Int
    note:String
  }

  type Auth {
    token: ID!
    user: User
  }

  type QueueItem {
    _id: ID!
    name: String!
  }

  type HabitDay {
    habit: Habit!
    isOn: Boolean!
    isComplete: Boolean!
  }

  type AssessmentDay {
    assessment: Assessment!
    value: Int
  }

  type Day {
    habitDays: [HabitDay]
    date: String!
    queueDays:[QueueDay]
    assessmentDays: [AssessmentDay]
  }  

  type Habit {
    _id: ID!
    name: String!
    prohibition: Boolean
    creator: User!
  }

  type Assessment {
    _id: ID!
    name: String!
    metric: String!
    creator: ID!
  }

  type ToDoForm {
    _id: ID!
    name: String!
    creator: ID!
  }

  type Entry {
    date:String!
    text:String!
  }

  type QueueSettings {
    settings:[Setting]
    offSettings:[Setting]
  }

  type Query {
    allUsers:[User]
    getDay(userId:ID!,date:String!):Day
    feedAssessment(userId:ID!,date:String!):Assessment
    getQueue(userId:ID!):User
    getToDos(userId:ID!):[ToDo]
    getDailyQueue(userId:ID!,date:String!): [QueueDay]
    getDates(userId:ID!):Dates
    getAllUsersAssessments(userId:ID!):[Assessment]
    getReview(userId:ID!,date:String!):Day
    getDash(userId:ID!,date:String!):Dash
    getAllSettings(userId:ID!):[Setting]
    getAllSettingsAndOffSettings(userId:ID!,queueItemId:ID!):QueueSettings
    getAllJournalEntries(userId:ID!):[Entry]
  }

  type Mutation {
      createUser(name:String!, email: String!, password: String!, birthdate: String!):User
      login(email: String!, password: String!): Auth
      addHabit(name:String!,prohibition:Boolean,creator:ID!,date:String!):Habit
      removeHabit(userId:ID!,habitId:ID!):User
      populateDay(userId: ID!, date:String!):User
      toggleHabitDay(userId: ID!,date:String!,habitDayId:ID!): Day
      toggleQueueDay(userId: ID!,date:String!,queueDayId:ID!): Day
      addQueueItem(name: String!,userId: ID!, date: String!):User
      removeQueueItem(userId: ID!,queueId: ID!, date: String!):User
      reorderQueue(userId: ID!,oldOrdinal:Int!,newOrdinal:Int! ):User
      addAssessment(userId: ID!,name: String!,metric: String!):Assessment
      addToDo(name:String!,creator: ID!,date:String!):ToDoForm
      makeAssessment(userId: ID!,date:String!,assessmentId:ID!,value:Int!):Day
      completeToDo(userId: ID!, toDoId: ID!, date: String!): String
      completeQueueItem(date:String!,userId:ID!,name:String!):String 
      deleteQueueItem(userId:ID!,queueItemId: ID,date:String ):String
      confirmDay(userId:ID!,date:String!):String
      deleteToDo(userId:ID!,toDoId:ID!):String
      deleteAssessment(userId:ID!,assessmentId:ID!):String
      deleteHabit(userId:ID!,habitId:ID!,date:String!):String
      prioritizeToDo(userId:ID!,toDoId:ID!,priority:Int!):String
      skipQueueItem(userId:ID!,queueItem:ID!,date:String!):QueueDay
      addSetting(userId:ID!,settingName:String!):String
      offSetting(userId:ID!,settingId:ID!,queueItemId:ID!,on:String!):String
      addJournalEntry(userId:ID!,date:String!,text:String!):Entry
      addNoteToToDo(userId:ID!,toDoId:ID!,note:String!):String 
      addQueueNote(userId:ID!,itemId:ID!,note:String!):String 
      addSubTask(userId:ID!,toDoId:ID!,name:String,date:String):SubTask
      completeSubTask(userId:ID!,toDoId:ID!,subtaskId:ID!,date:String!):String
      addSettingToDay(userId:ID!,settings:[String],date:String):String
      setOrientated(userId:ID!,value:String!):String
    }

`

module.exports = {typeDefs}