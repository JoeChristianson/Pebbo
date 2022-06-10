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

export const FEED_ASSESSMENT = gql`
query Query($userId: ID!, $date: String!) {
  feedAssessment(userId: $userId, date: $date) {
    _id
    name
    metric
  }
}`

export const GET_QUEUE = gql`
query Query($userId: ID!, $date: String!) {
  getDailyQueue(userId: $userId, date: $date) {
    queueItem {
      name
    }
    isOn
    isComplete
    date
  }
}
`

export const GET_TO_DOS = gql`
query Query($userId: ID!) {
  getToDos(userId: $userId) {
    toDoForm {
      _id
      name
    }
    dateCreated
    dateDone
    _id
  }
}
`