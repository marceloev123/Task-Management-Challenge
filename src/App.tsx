import React from 'react'
import {Route, Routes} from 'react-router-dom'
import styled from 'styled-components'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './views/Dashboard'
import MyTasks from './views/MyTasks'
import {GlobalStyle} from './styles/GlobalStyle'
import ActionBar from './components/ActionBar'
import UserProfile from './views/UserProfile'

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`
const Content = styled.div`
  position: absolute;
  width: calc(100% - 296px);
  left: 296px;
`

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <Sidebar />
      <Content>
        <Navbar />
        <ActionBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/my-tasks" element={<MyTasks />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Content>
    </AppContainer>
  )
}

export default App
