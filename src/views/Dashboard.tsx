/* eslint-disable no-console */
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {gql, useQuery} from '@apollo/client'
import DashboardCard from '../components/DashboardCard'

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 32px;
`

const GridColum = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  align-items: center;
`

const Dashboard = () => {
  //Fetch status to build the columns
  const GET_STATUS = gql`
    query getTasks {
      tasks(input: {}) {
        id
        name
        owner {
          id
          fullName
        }
      }
    }
  `
  const {loading, error, data} = useQuery(GET_STATUS)
  console.log(data)
  return (
    <Grid>
      <GridColum>
        <DashboardCard />
      </GridColum>
    </Grid>
  )
}

export default Dashboard
