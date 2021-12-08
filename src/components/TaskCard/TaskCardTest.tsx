/* eslint-disable no-console */
import {useQuery} from '@apollo/client'
import {GET_TASKS} from '../../graphql/queries/queries'
import {TaskTag} from '../../graphql/schemas'

const TaskCardTest = () => {
  interface User {
    __typename: string
    id: string
    avatar: string
    email: string
    fullName: string
    type: string
    createdAt: string
    updatedAt: string
  }
  interface TaskProps {
    task: {
      createdAt: string
      dueDate: string
      id: string
      name: string
      assignee: User
      pointEstimate: string
      position: string
      status: string
      tags: Array<TaskTag>
    }
  }
  const {loading, error, data} = useQuery(GET_TASKS)
  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Oh no!</p>
  }
  if (data) {
  }

  return (
    <ul>
      {data.tasks(({task}: TaskProps) => (
        <li key={task.id}>{task.name}</li>
      ))}
    </ul>
  )
}

export default TaskCardTest
