import {render, screen, waitFor} from '@testing-library/react'
import {MockedProvider} from '@apollo/client/testing'
import userEvent from '@testing-library/user-event'
import {DELETE_TASK} from '../graphql/mutations/mutations'
import DeleteTaskTest from '../components/TestComponents/DeleteTaskTest'

const deleTask = {
  deleteTask: {
    id: 'f7569288-c922-474e-a64a-75c8165d83ff',
    name: 'Something with React and Rails',
  },
}
const mocks = [
  {
    request: {
      query: DELETE_TASK,
      variables: {id: 'f7569288-c922-474e-a64a-75c8165d83ff'},
    },
    result: {data: deleTask},
  },
]

test('should delete task', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <DeleteTaskTest />
    </MockedProvider>,
  )
  const deleteButton = screen.getByRole('button', {name: 'Delete'})
  userEvent.click(deleteButton)
  await waitFor(() => new Promise(res => setTimeout(res, 0)))
  const deleteMessage = screen.getByText(/deleted!/i)
  expect(deleteMessage).toBeInTheDocument()
})
