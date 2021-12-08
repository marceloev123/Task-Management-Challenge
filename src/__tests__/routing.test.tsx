/* eslint-disable no-console */
import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {MemoryRouter} from 'react-router-dom'
import {MockedProvider} from '@apollo/client/testing'

import App from '../App'

//Temporary type solution

test('Routing should be workinkg', () => {
  const Wrapper = ({children}: any) => (
    <MockedProvider>
      <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
    </MockedProvider>
  )
  render(<App />, {wrapper: Wrapper})
  //First we get the links buttons on sidebar
  const myProfile = screen.getByRole('link', {name: /my profile/i})
  const myTasksLink = screen.getByRole('link', {name: /my task/i})

  //Then we go to My Task view
  userEvent.click(myTasksLink)
  const header1 = screen.getByText(/# task name/i)
  expect(header1).toBeInTheDocument()
  //Then we go to Profile View
  userEvent.click(myProfile)
  expect(header1).not.toBeInTheDocument()
})
