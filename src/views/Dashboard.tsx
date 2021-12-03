import React from 'react'
import styled from 'styled-components'
import {useQuery} from '@apollo/client'
import {RiMoreFill} from 'react-icons/ri'
import {toast, ToastContainer} from 'react-toastify'
import {GET_TASKS} from '../graphql/queries/queries'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '../components/Spinner/Spinner'
import TaskCard from '../components/TaskCard/TaskCard'

const Grid = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 32px;
  margin-bottom: 24px;
  margin-right: 36px;
  gap: 32px;
  height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
`

const GridColum = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 24px;
  margin: 0 0.8rem;
  padding-right: 0.8rem;
  min-width: 384px;
  overflow-y: auto;
`

const ColumHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
  // Group tasks by Status
  const {loading, error, data} = useQuery(GET_TASKS)
  let tasksByStatus = data?.tasks.reduce(
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
  if (loading) return <Spinner />
  if (error) {
    toast.error('An error occur while fetching the data!', {
      theme: 'dark',
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    tasksByStatus = {}
  }

  return (
    <>
      <Grid>
        {!data ? (
          <div>There are not tasks to display</div>
        ) : (
          Object.keys(tasksByStatus).map((key, idx) => (
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
              {tasksByStatus[key].reverse().map((task: TaskProps) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </GridColum>
          ))
        )}
      </Grid>
      <>
        <ToastContainer />
      </>
    </>
  )
}

export default Dashboard
