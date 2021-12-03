/* eslint-disable no-console */
import React, {useState} from 'react'
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
} from '../../utils/functions'
import Avatar from '../Avatar'
import Label from '../Label'
import LabelIcon from '../LabelIcon'
import ModalEditDelete from '../Modal/ModalEditDelete/ModalEditDelete'
import ModalUpdate from '../Modal/ModalUpdate/ModalUpdate'
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
// eslint-disable-next-line @typescript-eslint/no-var-requires
const text2num = require('text2num')

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
    owner: User
    pointEstimate: string
    position: string
    status: string
    tags: string[]
  }
}

const TaskCard = ({task}: TaskProps) => {
  const [editDeleteModalIsOpen, setOpenDeleteModalIsOpen] = useState(false)
  const [updateModalIsOpen, setOpenUpdateModalIsOpen] = useState(false)

  return (
    <CardContainer>
      <ProjectInfo>
        <TaskName>{task?.name}</TaskName>
        <RiMoreFill
          style={{
            color: '#94979A',
            width: '24px',
            height: '24px',
            marginLeft: '11px',
            cursor: 'pointer',
          }}
          onClick={() => setOpenDeleteModalIsOpen(!editDeleteModalIsOpen)}
        />
        {editDeleteModalIsOpen && (
          <ModalEditDelete
            id={task.id}
            onClick={() => setOpenDeleteModalIsOpen(false)}
            openUpdateModal={() => setOpenUpdateModalIsOpen(true)}
          />
        )}

        <ModalUpdate
          task={task}
          show={updateModalIsOpen}
          onClick={() => setOpenUpdateModalIsOpen(false)}
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
        <Avatar
          height="32px"
          width="32px"
          image={
            task?.owner?.avatar ||
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
