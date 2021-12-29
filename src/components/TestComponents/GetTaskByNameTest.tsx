import {useQuery} from '@apollo/client'
import {GET_TASK_BY_NAME} from '../../graphql/queries/queries'
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
interface GetTaskByNameTestProps {
  name: string
}

const GetTaskByNameTest = ({name}: GetTaskByNameTestProps) => {
  const {
    loading,
    error: getTaskByNameError,
    data,
  } = useQuery(GET_TASK_BY_NAME, {
    variables: {name: 'Something with React and Rails'},
  })
  if (loading) {
    return <p>Loading...</p>
  }

  if (getTaskByNameError) {
    return <p>Oh no!</p>
  }
  if (data) {
    return (
      <div>
        {data.tasks.map((task: TaskProps) => (
          <li key={task.id}>{task.name} Retrived Successfull</li>
        ))}
      </div>
    )
  }

  return <div>{name}</div>
}

export default GetTaskByNameTest
