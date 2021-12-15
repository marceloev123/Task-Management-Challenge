import {useState} from 'react'
import {Link, useMatch} from 'react-router-dom'
import {RiAddLine, RiFunctionLine, RiMenuLine} from 'react-icons/ri'
import 'react-toastify/dist/ReactToastify.css'
import TaskModal from '../Modal/TaskModal'
import {
  ActionbarContainer,
  Button,
  SwitchContainer,
} from './ActionbarComponents'

const Actionbar = () => {
  const match = useMatch(location.pathname)
  const [openModal, setOpenModal] = useState(false)

  return (
    <ActionbarContainer>
      <SwitchContainer>
        <Link to="/my-tasks">
          <RiMenuLine
            style={{
              height: '16px',
              width: '16px',
              color: match?.pathname === '/my-tasks' ? '#da584b' : '#94979A',
              border:
                match?.pathname === '/my-tasks' ? '1px solid #da584b' : 'none',
              borderRadius: '8px',
              padding: '11px',
            }}
          />
        </Link>
        <Link to="/">
          <RiFunctionLine
            style={{
              height: '16px',
              width: '16px',
              color: match?.pathname === '/' ? '#da584b' : '#94979A',
              border: match?.pathname === '/' ? '1px solid #da584b' : 'none',
              borderRadius: '8px',
              padding: '11px',
            }}
          />
        </Link>
      </SwitchContainer>

      <TaskModal show={openModal} onClick={() => setOpenModal(!openModal)} />

      <Button onClick={() => setOpenModal(!openModal)}>
        <RiAddLine style={{height: '20px', width: '20px'}} />
        Add Task
      </Button>
    </ActionbarContainer>
  )
}

export default Actionbar
