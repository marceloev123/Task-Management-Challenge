import {useMutation} from '@apollo/client'
import {UPDATE_TASK} from '../../graphql/mutations/mutations'

const UpdateTaskTest = () => {
  const [updateTask, {data, loading, error: updateTaskError}] =
    useMutation(UPDATE_TASK)

  if (loading) return <p>Loading...</p>
  if (updateTaskError) return <p>Oh no!</p>
  if (data) return <p>Task updated!</p>

  return (
    <button
      onClick={() =>
        updateTask({
          variables: {
            id: 'f7569288-c922-474e-a64a-75c8165d83ff',
            assigneeId: '15cef5e4-85fc-435f-bb0b-631ad8b8946e',
            dueDate: '2021-11-25T19:18:00.097Z',
            name: 'Something with React and Rails',
            position: 1,
            pointEstimate: 'ZERO',
            status: 'BACKLOG',
            tags: ['REACT', 'RAILS'],
          },
        })
      }
    >
      Update
    </button>
  )
}

export default UpdateTaskTest
