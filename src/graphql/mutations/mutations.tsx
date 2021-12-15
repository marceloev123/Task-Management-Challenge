import {gql} from '@apollo/client'

export const CREATE_TASK = gql`
  mutation createTask(
    $assigneeId: String
    $name: String!
    $pointEstimate: PointEstimate!
    $tags: [TaskTag!]!
    $status: Status!
  ) {
    createTask(
      input: {
        dueDate: "2021-11-25T19:18:00.097Z"
        assigneeId: $assigneeId
        name: $name
        pointEstimate: $pointEstimate
        status: $status
        tags: $tags
      }
    ) {
      name
    }
  }
`

export const UPDATE_TASK = gql`
  mutation updateTask(
    $assigneeId: String
    $dueDate: DateTime!
    $id: String!
    $name: String!
    $pointEstimate: PointEstimate!
    $position: Float!
    $status: Status!
    $tags: [TaskTag!]
  ) {
    updateTask(
      input: {
        id: $id
        dueDate: $dueDate
        assigneeId: $assigneeId
        name: $name
        position: $position
        pointEstimate: $pointEstimate
        status: $status
        tags: $tags
      }
    ) {
      name
    }
  }
`

export const DELETE_TASK = gql`
  mutation deleteTask($id: String!) {
    deleteTask(input: {id: $id}) {
      id
      name
    }
  }
`
