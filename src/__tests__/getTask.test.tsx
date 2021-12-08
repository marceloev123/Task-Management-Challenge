import {render, screen, waitFor} from '@testing-library/react'
import {MockedProvider} from '@apollo/client/testing'
import {GET_TASKS} from '../graphql/queries/queries'
import TaskCardTest from '../components/TaskCard/TaskCardTest'

const mocks = {
  request: {
    query: GET_TASKS,
  },
  result: {
    data: {
      tasks: [
        {
          id: '2013c3d2-2c5a-46ff-9b4b-636339ab7e94',
          createdAt: '2021-12-03T22:51:12.114Z',
          dueDate: '2021-11-25T19:18:00.097Z',
          name: 'Test again',
          assignee: {
            id: '15cef5e4-85fc-435f-bb0b-631ad8b8946e',
            avatar: null,
            fullName: 'Marcelo Ernesto Valdivia Vizcarra',
          },
          pointEstimate: 'ONE',
          position: 1,
          status: 'BACKLOG',
          tags: ['REACT', 'RAILS'],
        },
        {
          id: '0bab1944-7543-48a8-8d28-8ad7196509ea',
          createdAt: '2021-12-06T18:11:03.581Z',
          dueDate: '2021-11-25T19:18:00.097Z',
          name: '1',
          assignee: {
            id: '15cef5e4-85fc-435f-bb0b-631ad8b8946e',
            avatar: null,
            fullName: 'Marcelo Ernesto Valdivia Vizcarra',
          },
          pointEstimate: 'ZERO',
          position: 2,
          status: 'BACKLOG',
          tags: ['ANDROID'],
        },
        {
          id: '357c07c2-e062-4f05-a87b-c6e8e2fb895b',
          createdAt: '2021-12-07T23:15:46.554Z',
          dueDate: '2021-11-25T19:18:00.097Z',
          name: 'One more task',
          assignee: {
            id: 'c454b689-4168-4561-add9-8826e54e5bb8',
            avatar: 'https://avatars.dicebear.com/api/initials/jd.svg',
            fullName: 'Jhon Doe',
          },
          pointEstimate: 'TWO',
          position: 3,
          status: 'BACKLOG',
          tags: ['IOS'],
        },
      ],
    },
  },
  error: new Error('An error ocurred'),
}

test('should ', async () => {
  const {container} = render(
    <MockedProvider mocks={[mocks]}>
      <TaskCardTest />
    </MockedProvider>,
  )
  await waitFor(() => new Promise(res => setTimeout(res, 0)))
})
