import React from 'react'
import {Route, Routes} from 'react-router'
import styled from 'styled-components'
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Dashboard from './views/Dashboard'
import MyTasks from './views/MyTasks'

const Content = styled.div`
  position: absolute;
  width: calc(100% - 296px);
  left: 296px;
`

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Content>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/my-tasks" element={<MyTasks />} />
        </Routes>
      </Content>
    </div>
  )
}

export default App
