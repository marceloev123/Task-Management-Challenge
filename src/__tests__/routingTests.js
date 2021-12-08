import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {MemoryRouter} from 'react-router-dom'
import {ApolloProvider} from '@apollo/client'
import {client} from '../utils/authContext'
import App from '../App'

const Wrapper = ({children}) => (
  <ApolloProvider client={client}>
    <MemoryRouter>{children}</MemoryRouter>
  </ApolloProvider>
)

test('Routing should be workinkg', () => {
  render(<App />, {wrapper: Wrapper})

  const dashboardLink = screen.getByRole('link', {name: /dashboard/i})
  const myProfile = screen.getByRole('link', {name: /my profile/i})
  const myTasksLink = screen.getByRole('link', {name: /my task/i})
  userEvent.click(myTasksLink)
  const header1 = screen.getByText(/# task name/i)
  expect(header1).toBeInTheDocument()
  userEvent.click(dashboardLink)
})
