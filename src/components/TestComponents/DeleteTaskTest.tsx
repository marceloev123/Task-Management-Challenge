import {useMutation} from '@apollo/client'
import React from 'react'
import {DELETE_TASK} from '../../graphql/mutations/mutations'

const DeleteTaskTest = () => {
  const [deleteTask, {data, loading, error: deleteTaskError}] =
    useMutation(DELETE_TASK)

  if (loading) return <p>Loading...</p>
  if (deleteTaskError) return <p>Oh no!</p>
  if (data) return <p>Deleted!</p>
  return (
    <button
      onClick={() =>
        deleteTask({
          variables: {
            id: 'f7569288-c922-474e-a64a-75c8165d83ff',
          },
        })
      }
    >
      Delete
    </button>
  )
}

export default DeleteTaskTest
