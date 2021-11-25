# Task Management Challenge

## Setup/Running instructions

In the project directory, you can run:

### `yarn add` or ### `yarn`

This command install all the dependencies to run current project.

### `yarn start`

Runs the app in the development mode. Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

### `important`

If you're using Node version 17.0.1, you may used the following preposition
`export SET NODE_OPTIONS=--openssl-legacy-provide`, to run your yarn start or
yarn build commands

## Description

This project allows the user to browse and add tasks to another people. It's
like a Trello application for a bussiness project management and tasks
delegations that can help you to organize your teams and review the progress of
differents projects.

## Project Stack

The current project stack is composed for the following tools

- React JS (as a main framework).
- Typescript (for types prevention).
- Styled Components (for styling).
- Routing using React router DOM version 6.
- Apollo Client (for interact with the API)

## Principal Dashboard

The current view exposes the principal view of the application with all the
tasks classified by their status "BACKLOG-TODO-IN PROGRESS-CANCELLED"

### Screenshot

![DashboardScreen](https://user-images.githubusercontent.com/64241651/143501791-68dd217d-741a-44b5-b54c-4c7e5724f649.jpg)

### Loading and demonstration

https://user-images.githubusercontent.com/64241651/143502003-fba6d8a2-79af-474f-96f8-3ec1db24c4ed.mp4

As we can see, the tasks cards contain the relevant information of the task like
the name, due date, points, tags, and the avatar of the owner, also the spinner
component is rendered while the data is fetching

## User Profile

This view exposes the user information like his/her fullname, email, type, andh
the date where the profile was created in the DD Month, YYYY format

### User Profile

![UserProfile](https://user-images.githubusercontent.com/64241651/143502936-33452dcb-6227-4a0e-8b94-c3196de1a67c.jpg)

### Loading demonstration

https://user-images.githubusercontent.com/64241651/143503107-c7284568-c1d2-4f7f-b10d-99115fe94293.mp4

## Routing

https://user-images.githubusercontent.com/64241651/143503109-7e883a83-411d-46e7-8d98-ce453e091b97.mp4

All the views are implemented using routes and React router dom version 6
