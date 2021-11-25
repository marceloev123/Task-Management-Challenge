import React from 'react'
import styled from 'styled-components'
import {
  RiAlarmLine,
  RiAttachment2,
  RiNodeTree,
  RiChat3Line,
} from 'react-icons/ri'
import {RiMoreFill} from 'react-icons/ri'
import Label from './Label'
import LabelIcon from './LabelIcon'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  gap: 16px;
  width: 340px;
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
  max-height: 32px;
  width: 100%;
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
  gap: 8px;
`

const Reactions = styled.div`
  display: flex;
  flex-direction: row;
  width: 316px;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  color: white;
`
const InteractionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 106px;
  height: 24px;
  justify-content: space-between;
  align-items: center;
`
const Avatar = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background-color: white;
`
const ForkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40px;
  color: white;
`
const ForkAmount = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.75px;
`

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40px;
  color: white;
`
const CommentAmount = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.75px;
`

const DashboardCard = () => {
  return (
    <Card>
      <ProjectInfo>
        <TaskName>Twitter</TaskName>
        <RiMoreFill
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
      <Reactions>
        <Avatar />
        <InteractionsContainer>
          <RiAttachment2 style={{height: '16px', width: '16px'}} />
          <ForkContainer>
            <ForkAmount>3</ForkAmount>
            <RiNodeTree
              style={{height: '16px', width: '16px', marginLeft: '8px'}}
            />
          </ForkContainer>
          <CommentsContainer>
            <CommentAmount>3</CommentAmount>
            <RiChat3Line
              style={{height: '16px', width: '16px', marginLeft: '8px'}}
            />
          </CommentsContainer>
        </InteractionsContainer>
      </Reactions>
    </Card>
  )
}

export default DashboardCard
