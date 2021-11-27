import React from 'react'
import styled from 'styled-components'
import {
  RiAlarmLine,
  RiAttachment2,
  RiNodeTree,
  RiChat3Line,
} from 'react-icons/ri'
import {RiMoreFill} from 'react-icons/ri'
import {
  assignBackground,
  assignLabelColor,
  formatData,
} from '../utils/functions'
import Avatar from '../components/Avatar'
import Label from './Label'
import LabelIcon from './LabelIcon'

//This library help us to conver the points words to numbers
// eslint-disable-next-line @typescript-eslint/no-var-requires
const text2num = require('text2num')

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
  task: {
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
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  gap: 16px;
  width: 340px;
  height: 200px;
  background: #2c2f33;
  border-radius: 8px;
`

const ProjectInfo = styled.div`
  display: flex;
  max-height: 32px;
  min-width: 100%;
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

const TaskCard = ({task}: TaskProps) => {
  return (
    <Card>
      <ProjectInfo>
        <TaskName>{task?.name}</TaskName>
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
        <Points>{text2num(task?.pointEstimate.toLowerCase())} Pts</Points>
        <LabelIcon
          background="rgba(148, 151, 154, 0.1)"
          color="#FFF"
          text={formatData(task?.dueDate)}
          icon={
            <RiAlarmLine
              style={{height: '24px', width: '24px', marginRight: '9.75px'}}
            />
          }
        />
      </TimeInfo>
      <TagsContainer>
        {task?.tags.map((tag: string, idx) => (
          <Label
            key={idx}
            background={assignBackground(tag)}
            color={assignLabelColor(tag)}
            text={tag.toUpperCase()}
          />
        ))}
      </TagsContainer>
      <Reactions>
        <Avatar height="32px" width="32px" image={task?.owner?.avatar} />
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

export default TaskCard
