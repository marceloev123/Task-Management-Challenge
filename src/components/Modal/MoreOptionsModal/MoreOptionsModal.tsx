import {useEffect} from 'react'
import {useMutation} from '@apollo/client'
import {RiPencilLine, RiDeleteBin6Line} from 'react-icons/ri'
import {toast} from 'react-toastify'
import {DELETE_TASK} from '../../../graphql/mutations/mutations'
import {GET_TASKS} from '../../../graphql/queries/queries'
import {
  MutateModal,
  MutateOption,
  MutateOptionLabel,
} from '../../TaskCard/TaskCardComponents'

interface MoreOptionsModalProps {
  id: string
  onClick: () => void
  openUpdateModal: () => void
}

const MoreOptionsModal = ({
  id,
  onClick,
  openUpdateModal,
}: MoreOptionsModalProps) => {
  const [deleteTask, {error: deleteTaskError}] = useMutation(DELETE_TASK, {
    refetchQueries: [GET_TASKS],
  })

  //Delete Task
  const deleteHandler = async (taskId: string) => {
    try {
      await deleteTask({
        variables: {
          id: taskId,
        },
      })
      toast.success('Task deleted succesfully!', {
        theme: 'dark',
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (error) {
      toast.error('Error while deleting task!', {
        theme: 'dark',
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  useEffect(() => {
    if (deleteTaskError) {
      toast.error('An error occur during the delete request!', {
        theme: 'dark',
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }, [])
  return (
    <MutateModal onClick={onClick}>
      <MutateOption onClick={openUpdateModal}>
        <RiPencilLine
          style={{height: '24px', width: '24px', marginRight: '9.75px'}}
        />
        <MutateOptionLabel>Edit</MutateOptionLabel>
      </MutateOption>
      <MutateOption>
        <RiDeleteBin6Line
          style={{height: '24px', width: '24px', marginRight: '9.75px'}}
        />
        <MutateOptionLabel onClick={() => deleteHandler(id)}>
          Delete
        </MutateOptionLabel>
      </MutateOption>
    </MutateModal>
  )
}

export default MoreOptionsModal
