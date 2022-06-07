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
  }

  type Queue {
    queueItem: QueueItem
    ordinal: Int
  }

  type QueueItem {
    name: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type QueueItem {
    name: String!
  }

  type HabitDay {
    habit: Habit!
    isOn: Boolean!
    isComplete: Boolean!
  }

  
  type Day {
    habitDays: [HabitDay]
    date: String!
  }  

  type Habit {
    _id: ID!
    name: String!
    prohibition: Boolean
    creator: User!
  }

  type Query {
    allUsers:[User]
    getDay(userId:ID!,date:String!):Day
  }

  type Mutation {
      createUser(name:String!, email: String!, password: String!, birthdate: String!):User
      login(email: String!, password: String!): Auth
      addHabit(name:String!,prohibition:Boolean,creator:ID!):Habit
      removeHabit(userId:ID!,habitId:ID!):User
      populateDay(userId: ID!, date:String!):User
      toggleHabitDay(userId: ID!,date:String!,habitDayId:ID!): Day
      addQueueItem(name: String!,userId: ID!):User
      removeQueueItem(userId: ID!,queueId: ID!):User
    }

`

module.exports = {typeDefs}