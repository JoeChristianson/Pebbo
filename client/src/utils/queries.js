const {gql} = require("@apollo/client")

export const QUERY_REVIEW = gql`
query Query($userId: ID!, $date: String!) {
  getReview(userId: $userId, date: $date) {
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
    queueDays {
      date
      queueItem {
        name
        _id
      }
      isOn
      isComplete
      ordinal
    }
  }
}
`

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
      _id
      name
    }
    isOn
    isComplete
    date
    ordinal
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
    priority
  }
}
`

export const GET_DATES = gql`
query GetDates($userId: ID!) {
  getDates(userId: $userId) {
    lastAssessed
    lastPopulated
    birthdate
    lastReviewed
  }
}`

export const GET_ALL_USERS_ASSESSMENTS = gql`
query Query($userId: ID!) {
  getAllUsersAssessments(userId: $userId) {
    _id
    name
    metric
  }
}
`

export const GET_DASH = gql`
query Query($userId: ID!, $date: String!) {
  getDash(userId: $userId, date: $date) {
    toDos {
      _id
      toDoForm {
        _id
        name
        creator
      }
      dateCreated
      dateDone
    }
    queueDays {
      date
      queueItem {
        name
        _id
      }
      isOn
      isComplete
      ordinal
    }
    habitDays {
      habit {
        _id
        name
        prohibition
      }
      isOn
      isComplete
    }
  }
}
`

export const GET_QUEUE_ITEM_SETTINGS = gql`
query GetAllSettingsAndOffSettings($userId: ID!, $queueItemId: ID!) {
  getAllSettingsAndOffSettings(userId: $userId, queueItemId: $queueItemId) {
  
    settings {
      name
      id
    }
    offSettings {
      name
    }
  }
}
`

export const GET_VARIABLES = gql`
query GetAllSettings($userId: ID!) {
  getAllSettings(userId: $userId) {
    name
    id
  }
}
`