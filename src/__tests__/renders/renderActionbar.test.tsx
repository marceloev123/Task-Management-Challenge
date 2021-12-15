import {render, screen} from '@testing-library/react'
import {MockedProvider} from '@apollo/client/testing'
import {MemoryRouter} from 'react-router-dom'
import Actionbar from '../../components/Actionbar/Actionbar'

test('should actionbar renders correctly', () => {
  render(
    <MockedProvider>
      <MemoryRouter>
        <Actionbar />
      </MemoryRouter>
    </MockedProvider>,
  )
  const addTaskButton = screen.getByRole('button', {name: /add task/i})
  expect(addTaskButton).toBeInTheDocument()
})
