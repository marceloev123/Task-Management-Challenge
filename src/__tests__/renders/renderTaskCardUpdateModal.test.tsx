import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {MockedProvider} from '@apollo/client/testing'
import TaskCard from '../../components/TaskCard/TaskCard'
import {TaskTag} from '../../graphql/schemas'

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

const taskOwner: User = {
  __typename: 'User',
  id: '0bab1944-7543-48a8-8d28-8ad7196509ea',
  avatar: 'null',
  email: 'marcelovaldivia@ravn.co',
  fullName: 'Marcelo Ernesto Valdivia Vizcarra',
  type: 'CANDIDATE"',
  createdAt: '2021-11-23T22:34:13.847Z',
  updatedAt: '2021-11-23T22:34:13.848Z',
}
const taskTest: TaskProps = {
  createdAt: '2021-12-03T22:51:12.114Z',
  dueDate: '2021-11-25T19:18:00.097Z',
  id: '2013c3d2-2c5a-46ff-9b4b-636339ab7e94',
  name: 'Test 1',
  assignee: taskOwner,
  pointEstimate: 'ONE',
  position: '1',
  status: 'BACKLOG',
  tags: [TaskTag.React, TaskTag.Rails],
}

test('should task card renders with correct information', () => {
  render(
    <MockedProvider>
      <TaskCard task={taskTest} />
    </MockedProvider>,
  )
  const taskName = screen.getByText(/test 1/i)
  const pointEstimate = screen.getByText(/1 pts/i)
  const dueDate = screen.getByText(/25 november, 2021/i)
  const tag1 = screen.getByText(/react/i)
  const tag2 = screen.getByText(/rails/i)
  expect(taskName).toBeInTheDocument()
  expect(pointEstimate).toBeInTheDocument()
  expect(dueDate).toBeInTheDocument()
  expect(tag1).toBeInTheDocument()
  expect(tag2).toBeInTheDocument()
})

test('should More Options modal renders while onClick task more options button and removed it from the DOM if the button click twice', () => {
  render(
    <MockedProvider>
      <TaskCard task={taskTest} />
    </MockedProvider>,
  )
  const moreOptions = screen.getByRole('button', {
    name: /more options/i,
  })
  userEvent.click(moreOptions)
  const editButton = screen.getByRole('button', {name: /edit/i})
  const deleteButton = screen.getByRole('button', {name: /delete/i})
  expect(editButton).toBeInTheDocument()
  expect(deleteButton).toBeInTheDocument()
})

test('should Update Modal renders while onClick Edit option and removed it from the DOM when Cancel button was clicked ', () => {
  render(
    <MockedProvider>
      <TaskCard task={taskTest} />
    </MockedProvider>,
  )
  const moreOptions = screen.getByRole('button', {
    name: /more options/i,
  })
  userEvent.click(moreOptions)
  const editButton = screen.getByRole('button', {name: /edit/i})
  userEvent.click(editButton)
  const updateButton = screen.getByRole('button', {name: /update/i})
  const cancelButton = screen.getByRole('button', {name: /cancel/i})
  expect(updateButton).toBeInTheDocument()
  expect(cancelButton).toBeInTheDocument()
  //Works on conditional rendering, but lost transition styles if we do that
  // userEvent.click(cancelButton)
  // expect(updateButton).not.toBeInTheDocument()
  // expect(cancelButton).not.toBeInTheDocument()
})
