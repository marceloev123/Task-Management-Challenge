import {render, screen, waitFor} from '@testing-library/react'
import {MockedProvider} from '@apollo/client/testing'
import {GET_TASK_BY_NAME} from '../../graphql/queries/queries'
import GetTaskByNameTest from '../../components/TestComponents/GetTaskByNameTest'

const mocks = [
  {
    request: {
      query: GET_TASK_BY_NAME,
      variables: {
        name: 'Something with React and Rails',
      },
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
        ],
      },
      error: new Error('An error ocurred'),
    },
  },
]

test('should getTaskByName query works correctly', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <GetTaskByNameTest name="Something with React and Rails" />
    </MockedProvider>,
  )
  await waitFor(() => new Promise(res => setTimeout(res, 0)))
  const taskList = screen.getByRole('listitem')
  expect(taskList).toHaveTextContent(
    'Something with React and Rails Retrived Successfull',
  )
})
