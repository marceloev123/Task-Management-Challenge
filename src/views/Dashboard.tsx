import React, {useEffect} from 'react'
import styled from 'styled-components'
import {useQuery} from '@apollo/client'
import {RiMoreFill} from 'react-icons/ri'
import {toast, ToastContainer} from 'react-toastify'
import {GET_TASKS} from '../graphql/queries/queries'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '../components/Spinner/Spinner'
import TaskCard from '../components/TaskCard/TaskCard'
import {TaskTag} from '../graphql/schemas'

const Grid = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 56px;
  margin-bottom: 32px;
  margin-right: 32px;
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
  padding-right: 0.8rem;
  min-width: 340px;
  overflow-y: auto;
`

const ColumHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const ColumHeaderText = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
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
  assignee: User
  pointEstimate: string
  position: string
  status: string
  tags: Array<TaskTag>
}

const Dashboard = () => {
  // Group tasks by Status
  const {loading, error: getTasksError, data} = useQuery(GET_TASKS)

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

  useEffect(() => {
    if (getTasksError) {
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
  }, [])

  return (
    <>
      <Grid>
        {!data ? (
          <div style={{color: 'white'}}>There are not tasks to display</div>
        ) : (
          Object.keys(tasksByStatus).map((key, idx) => (
            <div key={key}>
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
              <GridColum key={idx}>
                {tasksByStatus[key].reverse().map((task: TaskProps) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </GridColum>
            </div>
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
