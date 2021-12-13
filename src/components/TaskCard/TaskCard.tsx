import React, {useState} from 'react'
import {
  RiAlarmLine,
  RiAttachment2,
  RiNodeTree,
  RiChat3Line,
} from 'react-icons/ri'
import {RiMoreFill} from 'react-icons/ri'
import {TaskTag} from '../../graphql/schemas'
import {
  assignBackground,
  assignLabelColor,
  formatData,
} from '../../utils/functions'
import Avatar from '../Avatar'
import Label from '../Label'
import LabelIcon from '../LabelIcon'
import MoreOptionsModal from '../Modal/MoreOptionsModal/MoreOptionsModal'
import TaskModal from '../Modal/TaskModal'
import {
  ProjectInfo,
  TaskName,
  TimeInfo,
  Points,
  TagsContainer,
  Reactions,
  InteractionsContainer,
  ForkContainer,
  ForkAmount,
  CommentsContainer,
  CommentAmount,
  CardContainer,
} from './TaskCardComponents'

//This library help us to conver the points words to numbers

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
  task: {
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
}

interface EstimatedPoints {
  [key: string]: number
  ZERO: number
  ONE: number
  TWO: number
  FOUR: number
  EIGHT: number
}

const TaskCard = ({task}: TaskProps) => {
  const [editDeleteModalIsOpen, setOpenDeleteModalIsOpen] = useState(false)
  const [updateModalIsOpen, setOpenUpdateModalIsOpen] = useState(false)
  const estimatedPointsValue: EstimatedPoints = {
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    FOUR: 4,
    EIGHT: 8,
  }

  return (
    <CardContainer>
      <ProjectInfo>
        <TaskName>{task?.name}</TaskName>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            padding: '0',
            lineHeight: '24px',
            cursor: 'pointer',
            fontSize: '0',
          }}
          onClick={() => setOpenDeleteModalIsOpen(!editDeleteModalIsOpen)}
        >
          <RiMoreFill
            style={{
              color: '#94979A',
              width: '24px',
              height: '24px',
              marginLeft: '11px',
              cursor: 'pointer',
            }}
          />
          more options
        </button>

        {editDeleteModalIsOpen && (
          <MoreOptionsModal
            id={task.id}
            onClick={() => setOpenDeleteModalIsOpen(false)}
            openUpdateModal={() => setOpenUpdateModalIsOpen(true)}
          />
        )}

        <TaskModal
          task={task}
          show={updateModalIsOpen}
          onClick={() => setOpenUpdateModalIsOpen(false)}
        />
      </ProjectInfo>

      <TimeInfo>
        <Points>{estimatedPointsValue[task?.pointEstimate]} Pts</Points>
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
        <Avatar
          height="32px"
          width="32px"
          image={
            task?.assignee?.avatar ||
            'https://avatars.dicebear.com/api/initials/mv.svg'
          }
        />
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
    </CardContainer>
  )
}

export default TaskCard
