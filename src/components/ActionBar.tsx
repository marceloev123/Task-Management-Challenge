/* eslint-disable no-console */
import React from 'react'
import styled from 'styled-components'
import {Link, useMatch, useLocation} from 'react-router-dom'
import {RiAddLine, RiFunctionLine, RiMenuLine} from 'react-icons/ri'

const ActionbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  flex-basis: 1108px;
  align-items: center;
  margin-top: 32px;
  margin-right: 36px;
  justify-content: space-between;
`

const SwitchContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: transparent;
  border: none;
  cursor: pointer;
`
const CreateButton = styled.button`
  height: 40px;
  width: 40px;
  background-color: #da584b;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ActionBar = () => {
  const location = useLocation()
  const match = useMatch(location.pathname)

  function openModal() {
    console.log('modal opened')
  }

  return (
    <ActionbarContainer>
      <SwitchContainer>
        <Link to="/">
          <RiMenuLine
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
        <Link to="/my-tasks">
          <RiFunctionLine
            style={{
              height: '24px',
              width: '24px',
              color: match?.pathname === '/my-tasks' ? '#da584b' : '#94979A',
              border:
                match?.pathname === '/my-tasks' ? '1px solid #da584b' : 'none',
              borderRadius: '8px',
              padding: '11px',
            }}
          />
        </Link>
      </SwitchContainer>
      <CreateButton onClick={openModal}>
        <RiAddLine style={{height: '24px', width: '24px'}} />
      </CreateButton>
    </ActionbarContainer>
  )
}

export default ActionBar
