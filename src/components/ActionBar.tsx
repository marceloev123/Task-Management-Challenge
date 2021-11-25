import React from 'react'
import styled from 'styled-components'
import {Link, useMatch, useLocation} from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
// import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {RiAddLine, RiFunctionLine, RiMenuLine} from 'react-icons/ri'

//Principal Container
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
//Principal Creation Button
const Button = styled.button`
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

//Dialog
const DialogContent = styled(Dialog.Content)`
  width: 431px;
  height: 184px;
  padding: 16px;
  background-color: #393d41;
  border-radius: 8px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px hsl(206 22% 7% / 20%) 0px
    10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 25;
`
const StyledOverlay = styled(Dialog.Overlay)`
  background: rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const TaskNameInput = styled.input`
  background: transparent;
  height: 32px;
  color: #94979a;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  letter-spacing: 0.75px;
  border: none;
  :focus {
    outline: none;
  }
`
const DataContainer = styled.div`
  display: flex;
  display: row;
  justify-content: space-between;
  width: 100%;
`
const ModalButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  height: 24px;
  gap: 16px;
`

//Modal Buttons

const CancelButton = styled.button`
  border: none;
  background: transparent;
  width: 62px;
  height: 40px;
  color: white;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.75px;
  cursor: pointer;
`
const CreateButton = styled.button`
  border: none;
  background: #da584b;
  width: 62px;
  height: 40px;
  color: white;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.75px;
  cursor: pointer;
  border-radius: 8px;
`

const ActionBar = () => {
  const location = useLocation()
  const match = useMatch(location.pathname)

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
      <form>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button>
              <RiAddLine style={{height: '24px', width: '24px'}} />
            </Button>
          </Dialog.Trigger>
          <StyledOverlay />
          <DialogContent>
            <Dialog.Title>
              <TaskNameInput placeholder="Task Tittle" />
            </Dialog.Title>
            <DataContainer></DataContainer>
            <ModalButtonsContainer>
              <Dialog.Close asChild>
                <CancelButton>Cancel</CancelButton>
              </Dialog.Close>
              <Dialog.Close asChild>
                <CreateButton type="submit">Create</CreateButton>
              </Dialog.Close>
            </ModalButtonsContainer>
          </DialogContent>
        </Dialog.Root>
      </form>
    </ActionbarContainer>
  )
}

export default ActionBar
