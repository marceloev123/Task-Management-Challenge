import {useQuery} from '@apollo/client'
import {GET_TASKS} from '../../graphql/queries/queries'
import {TaskTag} from '../../graphql/schemas'

interface User {
  __typename: string
  id: string
  avatar: string
  fullName: string
}
interface TaskProps {
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

const GetTasksTest = () => {
  const {loading, error: getTasksError, data} = useQuery(GET_TASKS)
  if (loading) return <div>Loading...</div>
  if (getTasksError) return <div>Oh no!</div>

  return (
    <ul aria-label="Tasks">
      {data.tasks.map((task: TaskProps) => (
        <li key={task.id}>{task.name}</li>
      ))}
    </ul>
  )
}

export default GetTasksTest
