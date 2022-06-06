const {gql} = require("@apollo/client")

export const QUERY_DAY = gql`
query Query($userId: ID!, $date: String!) {
    getDay(userId: $userId, date: $date) {
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