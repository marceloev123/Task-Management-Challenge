import {render, screen, waitFor, within} from '@testing-library/react'
import {MockedProvider} from '@apollo/client/testing'
import {GET_TASKS} from '../../graphql/queries/queries'
import GetTasksTest from '../../components/TestComponents/GetTasksTest'

const mocks = [
  {
    request: {
      query: GET_TASKS,
    },
    result: {
      data: {
        tasks: [
          {
            id: 'f7569288-c922-474e-a64a-75c8165d83ff',
            createdAt: '2021-12-09T18:54:17.687Z',
            dueDate: '2021-11-25T19:18:00.097Z',
            name: 'Something with React and Rails',
            assignee: {
              id: '15cef5e4-85fc-435f-bb0b-631ad8b8946e',
              avatar: null,
              fullName: 'Marcelo Ernesto Valdivia Vizcarra',
            },
            pointEstimate: 'FOUR',
            position: 1,
            status: 'BACKLOG',
            tags: ['REACT', 'RAILS'],
          },
          {
            id: 'f7442a22-ac6d-49e9-8b1c-61e29389d1bc',
            createdAt: '2021-12-09T18:50:05.543Z',
            dueDate: '2022-03-03T00:00:00.000Z',
            name: 'Updated test task again',
            assignee: {
              id: '15cef5e4-85fc-435f-bb0b-631ad8b8946e',
              avatar: null,
              fullName: 'Marcelo Ernesto Valdivia Vizcarra',
            },
            pointEstimate: 'TWO',
            position: 2,
            status: 'BACKLOG',
            tags: ['IOS'],
          },
        ],
      },
      error: new Error('An error ocurred'),
    },
  },
]

test('should getTasks query retrieve tasks correctly ', async () => {
  render(
    <MockedProvider mocks={mocks}>
      <GetTasksTest />
    </MockedProvider>,
  )
  await waitFor(() => new Promise(res => setTimeout(res, 0)))
  const tasksList = screen.getByRole('list', {name: /tasks/i})
  const {getAllByRole} = within(tasksList)
  const taskItems = getAllByRole('listitem')
  expect(taskItems.length).toBe(2)
  const tasksNames = taskItems.map(item => item.textContent)
  expect(tasksNames).toEqual([
    'Something with React and Rails',
    'Updated test task again',
  ])
})
