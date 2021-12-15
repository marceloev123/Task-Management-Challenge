import {Route, Routes} from 'react-router-dom'
import styled from 'styled-components'
import {GlobalStyle} from './styles/GlobalStyle'
import Actionbar from './components/Actionbar/Actionbar'
import Navbar from './components/Searchbar/Searchbar'
import Sidebar from './components/Sidebar/Sidebar'
import Dashboard from './views/Dashboard'
import MyTasks from './views/MyTasks'
import UserProfile from './views/UserProfile'

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`
const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`
const ContentBars = styled.div`
  background: #222528;
  z-index: 999;
  position: static;
  left: 296px;
  width: 100%;
`

const ContentMainView = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  flex-direction: column;
`

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <Sidebar />
      <Content>
        <ContentBars>
          <Navbar />
          <Actionbar />
        </ContentBars>
        <ContentMainView>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/my-tasks" element={<MyTasks />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </ContentMainView>
      </Content>
    </AppContainer>
  )
}

export default App
