const {gql} = require("@apollo/client")

export const TOGGLE_IS_COMPLETE = gql`
mutation Mutation($userId: ID!, $date: String!, $habitDayId: ID!) {
    toggleHabitDay(userId: $userId, date: $date, habitDayId: $habitDayId) {
      habitDays {
        habit {
          _id
          name
          prohibition
        }
        isOn
        isComplete
      }
      date
    }
  }
`

export const LOGIN_USER = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      name
      _id
      email
    }
  }
}
`;

export const POPULATE_DAY = gql`
mutation PopulateDay($userId: ID!, $date: String!) {
  populateDay(userId: $userId, date: $date) {
    _id
    name
    email
    password
    birthdate
    lastPopulated
  }
}

`