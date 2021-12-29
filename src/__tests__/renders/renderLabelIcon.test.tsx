import {render, screen} from '@testing-library/react'
import {MockedProvider} from '@apollo/client/testing'
import {RiAlarmLine} from 'react-icons/ri'

import LabelIcon from '../../components/LabelIcon'

test('should label with icon renders correctly', () => {
  render(
    <MockedProvider>
      <LabelIcon
        background="white"
        color="black"
        text="Testing LabelIcon"
        icon={<RiAlarmLine />}
      />
    </MockedProvider>,
  )
  const labelIconRendered = screen.getByText(/testing labelicon/i)
  expect(labelIconRendered).toBeInTheDocument()
})
