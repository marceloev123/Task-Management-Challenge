import {gql} from '@apollo/client'

export const CREATE_TASK = gql`
  mutation createTask(
    $name: String!
    $pointEstimate: PointEstimate!
    $tags: [TaskTag!]!
  ) {
    createTask(
      input: {
        dueDate: "2021-11-25T19:18:00.097Z"
        name: $name
        pointEstimate: $pointEstimate
        status: IN_PROGRESS
        tags: $tags
      }
    ) {
      id
    }
  }
`

export const UPDATE_TASK = gql`
  mutation updateTask(
    $dueDate: DateTime
    $id: String!
    $name: String
    $pointEstimate: PointEstimate
    $position: Float
    $status: Status
    $tags: [TaskTag!]
  ) {
    updateTask(
      input: {
        id: $id
        dueDate: "2019-12-03T09:54:33Z"
        name: $name
        position: 3
        pointEstimate: $pointEstimate
        status: $status
        tags: $tags
      }
    ) {
      id
    }
  }
`

export const DELETE_TASK = gql`
  mutation deleteTask($id: String!) {
    deleteTask(input: {id: $id}) {
      id
    }
  }
`
