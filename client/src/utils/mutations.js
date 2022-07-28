const {gql} = require("@apollo/client")

export const REGISTER = gql`
mutation CreateUser($name: String!, $email: String!, $password: String!, $birthdate: String!) {
  createUser(name: $name, email: $email, password: $password, birthdate: $birthdate) {
    _id
  }
}
`


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

export const MAKE_ASSESSMENT = gql`
mutation MakeAssessment($userId: ID!, $date: String!, $assessmentId: ID!, $value: Int!) {
  makeAssessment(userId: $userId, date: $date, assessmentId: $assessmentId, value: $value) {
    date
  }
}
`

export const ADD_QUEUE_ITEM = gql`
mutation AddQueueItem($name: String!, $userId: ID!, $date: String!) {
  addQueueItem(name: $name, userId: $userId, date: $date) {
    _id
    name
    email
    password
    birthdate
    lastPopulated
  }
}
`

export const ADD_TO_DO = gql`
mutation Mutation($name: String!, $creator: ID!, $date: String!) {
  addToDo(name: $name, creator: $creator, date: $date) {
    _id
    name
  }
}
`

export const COMPLETE_TO_DO = gql`
mutation Mutation($userId: ID!, $toDoId: ID!, $date: String!) {
  completeToDo(userId: $userId, toDoId: $toDoId, date: $date)
}
`

export const COMPLETE_QUEUE_ITEM = gql`
mutation Mutation($date: String!, $userId: ID!, $name: String!) {
  completeQueueItem(date: $date, userId: $userId, name: $name)
}

`

export const ADD_HABIT = gql`
mutation Mutation($name: String!, $creator: ID!,$date: String!) {
  addHabit(name: $name, creator: $creator, date:$date) {
    _id
    name
  }
}
`

export const REORDER_QUEUE = gql`
mutation Mutation($userId: ID!, $oldOrdinal: Int!, $newOrdinal: Int!) {
  reorderQueue(userId: $userId, oldOrdinal: $oldOrdinal, newOrdinal: $newOrdinal) {
    _id
  }
}
`

export const DELETE_QUEUE_ITEM = gql`
mutation Mutation($userId: ID!, $queueItemId: ID, $date: String) {
  deleteQueueItem(userId: $userId, queueItemId: $queueItemId, date: $date)
}
`

export const ADD_ASSESSMENT = gql`
mutation Mutation($userId: ID!, $name: String!, $metric: String!) {
  addAssessment(userId: $userId, name: $name, metric: $metric) {
    _id
    name
    metric
  }
}
`

export const CONFIRM_DAY = gql`
mutation Mutation($userId: ID!, $date: String!) {
  confirmDay(userId: $userId, date: $date)
}
`

export const DELETE_TO_DO = gql`
mutation DeleteToDo($userId: ID!, $toDoId: ID!) {
  deleteToDo(userId: $userId, toDoId: $toDoId)
}

`

export const DELETE_ASSESSMENT = gql`
mutation Mutation($userId: ID!, $assessmentId: ID!) {
  deleteAssessment(userId: $userId, assessmentId: $assessmentId)
}

`

export const PRIORITIZE_TO_DO = gql`
mutation Mutation($toDoId: ID!, $priority: Int!, $userId: ID!) {
  prioritizeToDo(toDoId: $toDoId, priority: $priority, userId: $userId)
}
`