import {render} from '@testing-library/react'
import {MockedProvider} from '@apollo/client/testing'
import Avatar from '../../components/Avatar'

test('should avatar renders correctly', () => {
  render(
    <MockedProvider>
      <Avatar
        id="avatar"
        height="32px"
        width="32px"
        image="https://avatars.dicebear.com/api/initials/mv.svg"
      />
    </MockedProvider>,
  )

  const avatarRendered = document.querySelector('#avatar')
  expect(avatarRendered).toBeInTheDocument()
})
