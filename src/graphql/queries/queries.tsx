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
//Get task by Id
// In  a real production environment, I think there should be an option to select a task by the id to retrieve the data in real time and avoid updating conflicts with other team members updates
// export const GET_TASK_BY_ID = gql`
//   query getTaskById($id: ID!) {
//     tasks(input: {id: $id}) {
//       id
//     }
//   }
// `
