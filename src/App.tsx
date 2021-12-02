import React from 'react'
import {Route, Routes} from 'react-router-dom'
import styled from 'styled-components'
import {GlobalStyle} from './styles/GlobalStyle'
import Actionbar from './components/Actionbar/Actionbar'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Dashboard from './views/Dashboard'
import MyTasks from './views/MyTasks'
import UserProfile from './views/UserProfile'

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  height: 100%;
  width: 100%;
`
const Content = styled.div`
  position: absolute;
  overflow: auto;
  min-height: 100%;
  width: calc(100% - 296px);
  left: 296px;

  @media (max-width: 1898px) {
    width: calc(100% - 168px);
    left: 168px;
  }
`
const ContentView = styled.div`
  background: #222528;
  z-index: 999;
  position: fixed;
  width: calc(100% - 296px);
  left: 296px;
  @media (max-width: 1898px) {
    width: calc(100% - 168px);
    left: 168px;
  }
`

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <Sidebar />
      <Content>
        <ContentView>
          <Navbar />
          <Actionbar />
        </ContentView>
        <div style={{marginTop: '208px'}}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/my-tasks" element={<MyTasks />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </div>
      </Content>
    </AppContainer>
  )
}

export default App
