import React from 'react'
import styled from 'styled-components'
import {RiAlarmLine} from 'react-icons/ri'
import {FiMoreHorizontal} from 'react-icons/fi'
import Label from './Label'
import LabelIcon from './LabelIcon'
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  width: 348px;
  height: 208px;
  background: #2c2f33;
  border-radius: 8px;
`

const ProjectInfo = styled.div`
  display: flex;
  max-height: 32px;
  min-width: 316px;
  flex-basis: 100%;
  justify-content: space-between;
  align-items: center;
`
const TaskName = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  display: flex;
  width: 284px;
  align-items: center;
  letter-spacing: 0.75px;
  color: #ffffff;
`
const TimeInfo = styled.div`
  display: flex;
  margin-top: 20px;
  max-height: 32px;
  min-width: 316px;
  flex-basis: 100%;
  justify-content: space-between;
  align-items: center;
`
const Points = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  display: flex;
  align-items: center;
  letter-spacing: 0.75px;
  color: #ffffff;
`
const TagsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 16px;
  gap: 8px;
`

const DashboardCard = () => {
  return (
    <Card>
      <ProjectInfo>
        <TaskName>Twitter</TaskName>
        <FiMoreHorizontal
          style={{
            color: '#94979A',
            width: '24px',
            height: '24px',
            marginLeft: '11px',
          }}
        />
      </ProjectInfo>
      <TimeInfo>
        <Points>3 Pts</Points>
        <LabelIcon
          background="rgba(148, 151, 154, 0.1)"
          color="#FFF"
          text="TODAY"
          icon={
            <RiAlarmLine
              style={{height: '24px', width: '24px', marginRight: '9.75px'}}
            />
          }
        />
      </TimeInfo>
      <TagsContainer>
        <Label
          background="rgba(112, 178, 82, 0.1);"
          color="#70B252"
          text="IOS APP"
        />
        <Label
          background="rgba(229, 180, 84, 0.1);"
          color="#E5B454"
          text="ANDROID"
        />
      </TagsContainer>
    </Card>
  )
}

export default DashboardCard
