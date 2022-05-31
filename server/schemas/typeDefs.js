const {gql} = require("apollo-server-express")

const typeDefs = gql`
    type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    birthdate: String!
    habits:[Habit]
  }

  type Habit {
    _id: ID!
    name: String!
    prohibition: Boolean
    creator: User!
  }

  type Query {
    allUsers:[User]
  }

  type Mutation {
      createUser(name:String!, email: String!, password: String!, birthdate: String!):User
      addHabit(name:String!,prohibition:Boolean,creator:ID!):Habit
      removeHabit(userId:ID!,habitId:ID!):User
    }

`

module.exports = {typeDefs}