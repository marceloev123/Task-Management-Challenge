import {gql} from '@apollo/client'

//Get all tasks
export const GET_TASKS = gql`
  query getTasks {
    tasks(input: {}) {
      id
      createdAt
      dueDate
      name
      owner {
        id
        avatar
        fullName
      }
      pointEstimate
      position
      status
      tags
    }
  }
`
//Get users
export const GET_USERS = gql`
  query getUsers {
    tasks(input: {}) {
      owner {
        id
        avatar
        fullName
      }
    }
  }
`
