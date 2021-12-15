import {render, screen, waitFor} from '@testing-library/react'
import {MockedProvider} from '@apollo/client/testing'
import userEvent from '@testing-library/user-event'
import {UPDATE_TASK} from '../graphql/mutations/mutations'
import UpdateTaskTest from '../components/TestComponents/UpdateTaskTest'

const updateTask = {
  updateTask: {
    name: 'Something with React and Rails',
  },
}

const mocks = [
  {
    request: {
      query: UPDATE_TASK,
      variables: {
        id: 'f7569288-c922-474e-a64a-75c8165d83ff',
        assigneeId: '15cef5e4-85fc-435f-bb0b-631ad8b8946e',
        dueDate: '2021-11-25T19:18:00.097Z',
        name: 'Something with React and Rails',
        position: 1,
        pointEstimate: 'ZERO',
        status: 'BACKLOG',
        tags: ['REACT', 'RAILS'],
      },
    },
    result: {data: updateTask},
  },
]

test('should update a task', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UpdateTaskTest />
    </MockedProvider>,
  )
  const updateButton = screen.getByRole('button', {name: 'Update'})
  userEvent.click(updateButton)
  await waitFor(() => new Promise(res => setTimeout(res, 0)))
  const updatedSuccessfulMessage = screen.getByText(/task updated!/i)
  expect(updatedSuccessfulMessage).toBeInTheDocument()
})
