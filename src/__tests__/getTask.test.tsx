import {render, screen} from '@testing-library/react'
import {MockedProvider} from '@apollo/client/testing'
import {GET_TASK_NAME} from '../graphql/queries/queries'
import {TaskTag} from '../graphql/schemas'
import TaskCard from '../components/TaskCard/TaskCard'

const mocks = {
  request: {
    query: GET_TASK_NAME,
  },
  result: {
    data: {
      tasks: [
        {
          id: '8954fbc1-57b5-4a31-a516-35aca6cdc9d7',
          createdAt: '2021-12-07T23:14:06.435Z',
          dueDate: '2021-11-25T19:18:00.097Z',
          name: 'Super cool task title',
          assignee: {
            id: '15cef5e4-85fc-435f-bb0b-631ad8b8946e',
            avatar: 'null',
            fullName: 'Marcelo Ernesto Valdivia Vizcarra',
            type: 'CANDIDATE',
            createdAt: '2021-11-23T22:34:13.847Z',
            updatedAt: '2021-11-23T22:34:13.848Z',
            email: 'marcelovaldivia@ravn.co',
            __typename: 'User',
          },
          pointEstimate: 'FOUR',
          position: '6',
          status: 'TODO',
          tags: [TaskTag.Android, TaskTag.NodeJs],
        },
      ],
    },
  },
  error: new Error('An error ocurred'),
}

test('should ', async () => {
  render(
    <MockedProvider mocks={[mocks]} addTypename={false}>
      <TaskCard task={mocks.result.data.tasks[0]} />
    </MockedProvider>,
  )
  await new Promise(resolve => setTimeout(resolve, 0))
  screen.debug()
})
