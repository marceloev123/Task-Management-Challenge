/* eslint-disable no-console */
import React, {useState} from 'react'
import {Link, useMatch} from 'react-router-dom'
import {RiAddLine, RiFunctionLine, RiMenuLine} from 'react-icons/ri'
import 'react-toastify/dist/ReactToastify.css'
import ModalCreate from '../Modal/ModalCreate/ModalCreate'
import {
  ActionbarContainer,
  Button,
  SwitchContainer,
} from './ActionbarComponents'

const Actionbar = () => {
  const match = useMatch(location.pathname)
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <ActionbarContainer>
        <SwitchContainer>
          <Link to="/my-tasks">
            <RiMenuLine
              style={{
                height: '24px',
                width: '24px',
                color: match?.pathname === '/my-tasks' ? '#da584b' : '#94979A',
                border:
                  match?.pathname === '/my-tasks'
                    ? '1px solid #da584b'
                    : 'none',
                borderRadius: '8px',
                padding: '11px',
              }}
            />
          </Link>
          <Link to="/">
            <RiFunctionLine
              style={{
                height: '24px',
                width: '24px',
                color: match?.pathname === '/' ? '#da584b' : '#94979A',
                border: match?.pathname === '/' ? '1px solid #da584b' : 'none',
                borderRadius: '8px',
                padding: '11px',
              }}
            />
          </Link>
        </SwitchContainer>
        <>
          <ModalCreate
            show={openModal}
            onClick={() => setOpenModal(!openModal)}
          ></ModalCreate>
          <Button onClick={() => setOpenModal(!openModal)}>
            <RiAddLine style={{height: '24px', width: '24px'}} />
          </Button>
        </>
      </ActionbarContainer>
    </>
  )
}

export default Actionbar
