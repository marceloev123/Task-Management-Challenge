import React from 'react'
import styled from 'styled-components'
import {gql, useQuery} from '@apollo/client'
import {RiMoreFill} from 'react-icons/ri'
import Spinner from '../components/Spinner/Spinner'
import TaskCard from '../components/TaskCard'

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
  flex-basis: 100%;
  margin-top: 32px;
`

const GridColum = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  align-items: center;
  gap: 16px;
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
  //Fetch the data
  const GET_STATUS = gql`
    query getTasks {
      tasks(input: {}) {
        id
        createdAt
        dueDate
        name
        owner {
          id
          avatar
          fullName
        }
        pointEstimate
        position
        status
        tags
      }
    }
  `
  const {loading, error, data} = useQuery(GET_STATUS)

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
  if (loading) return <Spinner />
  if (error) throw new Error(`Error! ${error.message}`)
  return (
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
            <TaskCard key={task.id} task={task} />
          ))}
        </GridColum>
      ))}
    </Grid>
  )
}

export default Dashboard
