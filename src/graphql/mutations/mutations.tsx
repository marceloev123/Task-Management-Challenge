import {gql} from '@apollo/client'

export const CREATE_TASK = gql`
  mutation createTask(
    $name: String!
    $pointEstimate: PointEstimate!
    $tags: [TaskTag!]!
  ) {
    createTask(
      input: {
        dueDate: "2019-12-03T09:54:33Z"
        name: $name
        pointEstimate: $pointEstimate
        status: BACKLOG
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
