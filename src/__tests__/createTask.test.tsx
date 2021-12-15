import {render, screen, waitFor} from '@testing-library/react'
import {MockedProvider} from '@apollo/client/testing'
import userEvent from '@testing-library/user-event'
import {CREATE_TASK} from '../graphql/mutations/mutations'
import CreateTaskTest from '../components/TestComponents/CreateTaskTest'

const createTask = {
  createTask: {
    name: 'Testing createTask',
  },
}

const mocks = [
  {
    request: {
      query: CREATE_TASK,
      variables: {
        assigneeId: '15cef5e4-85fc-435f-bb0b-631ad8b8946e',
        name: 'Testing createTask',
        pointEstimate: 'FOUR',
        tags: ['REACT', 'RAILS'],
        status: 'BACKLOG',
      },
    },
    result: {data: createTask},
  },
]

test('should create a task', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CreateTaskTest />
    </MockedProvider>,
  )
  const createButton = screen.getByRole('button', {name: 'Create'})
  userEvent.click(createButton)
  await waitFor(() => new Promise(res => setTimeout(res, 0)))
  const createdSuccessfulMessage = screen.getByText(/task created!/i)
  expect(createdSuccessfulMessage).toBeInTheDocument()
})
