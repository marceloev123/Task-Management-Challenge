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

### First Screenshot

![DashboardScreen](https://user-images.githubusercontent.com/64241651/143501791-68dd217d-741a-44b5-b54c-4c7e5724f649.jpg)

### Second Screenshot

![Dashboard2](https://user-images.githubusercontent.com/64241651/143602732-8c80c675-72fe-491a-bcdf-cd254aa2edeb.png)

Some visual improvements

### Loading and demonstration

https://user-images.githubusercontent.com/64241651/143502003-fba6d8a2-79af-474f-96f8-3ec1db24c4ed.mp4

As we can see, the tasks cards contain the relevant information of the task like
the name, due date, points, tags, and the avatar of the owner, also the spinner
component is rendered while the data is fetching

### Responsive demonstration

https://user-images.githubusercontent.com/64241651/143616518-7ef4426f-88db-458c-bb66-4f752c3559cc.mp4


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

## My Tasks view

A little advance of the table 😞

![MyTasks](https://user-images.githubusercontent.com/64241651/143507588-6c42c046-3f2a-4542-8db8-b9f3ec8c03f8.jpg)

## Create Tasks Modal
https://user-images.githubusercontent.com/64241651/143666409-bbb78919-e6d2-4897-b110-0802df239787.mp4


## Create Mutation on action
https://user-images.githubusercontent.com/64241651/144138974-a04bbe78-a636-44c5-a912-10b217ee5edb.mp4

The app allows the user create new tasks indicating their Estimated points, the person responsible and the tags of the kind of applications, when the request is done a succesfull message it's shown 



## Delete Mutation on action
https://user-images.githubusercontent.com/64241651/144139920-06875b50-e00f-47f4-8fbc-6bd1b7a7dec4.mp4

The app allows the user delete the tasks selecting the `Delete` option through a pop-up ,when the request is done a succesfull message it's shown 


## Total App refactor
https://user-images.githubusercontent.com/64241651/144554302-9af716c2-1216-498a-a6e3-2db949ccf07a.mp4

Here, the app was completed refactored and was updated with the styling guides recomendations

## Update Mutation in Action Final Stage
https://user-images.githubusercontent.com/64241651/144677998-1ab1ca49-997e-4dbe-8cdd-2656d7fb0bac.mp4

## Finally with the refactored API, the app includes a Date Picker to define the task Due Date and an Assigne Select to determine who is the person responsible about that task
https://user-images.githubusercontent.com/64241651/146435540-e4ea4605-e169-4ffb-828c-46ea38680b37.mp4

