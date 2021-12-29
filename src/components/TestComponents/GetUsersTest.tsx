import {useQuery} from '@apollo/client'
import {GET_USERS} from '../../graphql/queries/queries'

interface User {
  __typename: string
  id: string
  avatar: string
  fullName: string
}
interface TaskProps {
  assignee: User
}

const GetUsersTest = () => {
  const {loading, error: getUsersError, data} = useQuery(GET_USERS)

  if (loading) return <div>Loading...</div>
  if (getUsersError) return <div>Oh no!</div>

  return (
    <div>
      {data.tasks.map((task: TaskProps) => (
        <li key={task.assignee.id}>{task.assignee.fullName}</li>
      ))}
    </div>
  )
}

export default GetUsersTest
