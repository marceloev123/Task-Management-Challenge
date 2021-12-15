import {render, screen, waitFor} from '@testing-library/react'
import {MockedProvider} from '@apollo/client/testing'
import {GET_USERS} from '../../graphql/queries/queries'
import GetUsersTest from '../../components/TestComponents/GetUsersTest'

const mocks = [
  {
    request: {
      query: GET_USERS,
    },
    result: {
      data: {
        tasks: [
          {
            assignee: {
              id: '15cef5e4-85fc-435f-bb0b-631ad8b8946e',
              avatar: null,
              fullName: 'Marcelo Ernesto Valdivia Vizcarra',
            },
          },
        ],
      },
      error: new Error('An error ocurred'),
    },
  },
]

test('should getUsers query works correctly ', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <GetUsersTest />
    </MockedProvider>,
  )
  await waitFor(() => new Promise(res => setTimeout(res, 10)))
  const userItemList = screen.getByRole('listitem')
  expect(userItemList).toHaveTextContent('Marcelo Ernesto Valdivia Vizcarra')
})
