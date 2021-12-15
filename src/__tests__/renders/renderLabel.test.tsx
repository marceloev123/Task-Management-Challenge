import {render, screen} from '@testing-library/react'
import {MockedProvider} from '@apollo/client/testing'
import Label from '../../components/Label'

test('should label renders correctly', () => {
  render(
    <MockedProvider>
      <Label background="white" color="black" text="Testing Label" />
    </MockedProvider>,
  )
  const labelRendered = screen.getByText(/testing label/i)
  expect(labelRendered).toBeInTheDocument()
})
