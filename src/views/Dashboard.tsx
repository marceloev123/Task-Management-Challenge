/* eslint-disable no-console */
import React from 'react'
import styled from 'styled-components'
import {useMutation, useQuery} from '@apollo/client'
import {RiMoreFill} from 'react-icons/ri'
import {ToastContainer, toast} from 'react-toastify'
import {GET_TASKS} from '../graphql/queries/queries'
import {DELETE_TASK} from '../graphql/mutations/mutations'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '../components/Spinner/Spinner'
import TaskCard from '../components/TaskCard/TaskCard'

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: 1108px;
  margin-top: 32px;
  margin-right: 36px;
  justify-content: space-between;
  gap: 32px;
`

const GridColum = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  align-items: center;
  gap: 24px;
`

const ColumHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 340px;
  height: 32px;
`

const ColumHeaderText = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  color: white;
  letter-spacing: 0.75px;
`

interface User {
  id: string
  avatar: string
  email: string
  fullName: string
  type: string
  createdAt: string
  updatedAt: string
}

interface TaskProps {
  createdAt: string
  dueDate: string
  id: string
  name: string
  owner: User
  pointEstimate: string
  position: string
  status: string
  tags: string[]
}

const Dashboard = () => {
  const {loading, error, data} = useQuery(GET_TASKS)
  const [deleteTask, {data: data1, loading: loading1, error: error1}] =
    useMutation(DELETE_TASK, {
      refetchQueries: [GET_TASKS, 'GetTasks'],
    })

  // Group tasks by Status
  const tasksByStatus = data?.tasks.reduce(
    (previousTask: {[key: string]: TaskProps[]}, currentTask: TaskProps) => {
      const key = currentTask.status
      if (!previousTask[key]) {
        previousTask[key] = []
      }
      previousTask[key].push(currentTask)
      return previousTask
    },
    {},
  )
  if (loading || loading1) return <Spinner />
  if (error) throw new Error(`Error! ${error.message}`)

  //Delete Task
  const deleteHandler = async (taskId: string) => {
    try {
      await deleteTask({
        variables: {
          id: taskId,
        },
      })
    } catch (error) {
      throw new Error(`Error: ${error}`)
    } finally {
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
    }
  }
  return (
    <>
      <Grid>
        {Object.keys(tasksByStatus).map((key, idx) => (
          <GridColum key={idx}>
            <ColumHeaderContainer>
              <ColumHeaderText>
                {key} ({tasksByStatus[key].length})
              </ColumHeaderText>
              <RiMoreFill
                style={{
                  color: '#94979A',
                  width: '24px',
                  height: '24px',
                  marginLeft: '11px',
                }}
              />
            </ColumHeaderContainer>
            {tasksByStatus[key].map((task: TaskProps) => (
              <TaskCard
                key={task.id}
                task={task}
                deleteTask={() => deleteHandler(task.id)}
              />
            ))}
          </GridColum>
        ))}
      </Grid>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default Dashboard
