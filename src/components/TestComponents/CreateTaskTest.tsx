import React from 'react'
import {useMutation} from '@apollo/client'
import {CREATE_TASK} from '../../graphql/mutations/mutations'

const CreateTaskTest = () => {
  const [createTask, {data, loading, error: createTaskError}] =
    useMutation(CREATE_TASK)

  if (loading) return <p>Loading...</p>
  if (createTaskError) return <p>Oh no!</p>
  if (data) return <p>Task created!</p>

  return (
    <button
      onClick={() =>
        createTask({
          variables: {
            assigneeId: '15cef5e4-85fc-435f-bb0b-631ad8b8946e',
            name: 'Testing createTask',
            pointEstimate: 'FOUR',
            tags: ['REACT', 'RAILS'],
            status: 'BACKLOG',
          },
        })
      }
    >
      Create
    </button>
  )
}

export default CreateTaskTest
