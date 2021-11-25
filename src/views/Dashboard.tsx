import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {gql, useQuery} from '@apollo/client'
import {RiMoreFill} from 'react-icons/ri'

import DashboardCard from '../components/DashboardCard'

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-space-between;
  gap: 32px;
  margin-top: 32px;
`

const GridColum = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  align-items: center;
  gap: 16px;
`

const ColumHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 340px;
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

  return (
    <Grid>
      <GridColum>
        <ColumHeaderContainer>
          <ColumHeaderText>Working (03)</ColumHeaderText>
          <RiMoreFill
            style={{
              color: '#94979A',
              width: '24px',
              height: '24px',
              marginLeft: '11px',
            }}
          />
        </ColumHeaderContainer>
        <DashboardCard />
      </GridColum>
      <GridColum>
        <ColumHeaderContainer>
          <ColumHeaderText>Working (03)</ColumHeaderText>
          <RiMoreFill
            style={{
              color: '#94979A',
              width: '24px',
              height: '24px',
              marginLeft: '11px',
            }}
          />
        </ColumHeaderContainer>
        <DashboardCard />
      </GridColum>
      <GridColum>
        <ColumHeaderContainer>
          <ColumHeaderText>Working (03)</ColumHeaderText>
          <RiMoreFill
            style={{
              color: '#94979A',
              width: '24px',
              height: '24px',
              marginLeft: '11px',
            }}
          />
        </ColumHeaderContainer>
        <DashboardCard />
      </GridColum>
      <GridColum>
        <ColumHeaderContainer>
          <ColumHeaderText>Working (03)</ColumHeaderText>
          <RiMoreFill
            style={{
              color: '#94979A',
              width: '24px',
              height: '24px',
              marginLeft: '11px',
            }}
          />
        </ColumHeaderContainer>
        <DashboardCard />
      </GridColum>
    </Grid>
  )
}

export default Dashboard
