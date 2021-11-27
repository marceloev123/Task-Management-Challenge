import React from 'react'
import styled from 'styled-components'
import {Link, useMatch} from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import {
  RiAddLine,
  RiFunctionLine,
  RiIncreaseDecreaseFill,
  RiMenuLine,
  RiUser3Fill,
  RiPriceTag3Fill,
} from 'react-icons/ri'

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
const DialogContainer = styled(Dialog.Root)`
  padding: 16px;
`

const DialogContent = styled(Dialog.Content)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 431px;
  padding: 16px;
  background-color: #393d41;
  border-radius: 8px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px hsl(206 22% 7% / 20%) 0px
    10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -156%);
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
const DropdownContainer = styled.div`
  display: flex;
  display: row;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
`
const ModalButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  height: 40px;
  gap: 16px;
`

//Estimated Points Dropdown
const EstimatedPointsDropdown = styled(Dropdown.Content)`
  display: flex;
  margin-top: 12px;
  width: 132px;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #94979a;
  padding-bottom: 8px;
  background: #393d41;
  box-sizing: border-box;
  border-radius: 8px;
  z-index: 1;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`

const TriggerDropdown = styled(Dropdown.Trigger)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 128px;
  max-height: 32px;
  gap: 8px;
  padding: 0 12px;
  background: rgba(148, 151, 154, 0.1);
  border-radius: 4px;
  cursor: pointer;
  appearance: none;
  border-style: none;
`

const TriggerLabel = styled.span`
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.75px;
  color: #ffffff;
`
const EstimatedPointsItemHeader = styled(Dropdown.Item)`
  display: flex;
  flex-direction: row;
  margin-left: 16px;
  margin-top: 8px;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  letter-spacing: 0.75px;
  color: #94979a;
`
const EstimatedPointsItem = styled(Dropdown.Item)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 4px;
  cursor: pointer;
  ::focus {
    background: #94979a;
  }
`
const EstimatedPointsItemLabel = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.75px;
  color: #ffffff;
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
  const match = useMatch(location.pathname)
  // const [estimatedPoints, setEstimatedPoints] = useState(-1)
  // const [users, setUsers] = useState([])
  // const [selectedUser, setSelectedUser] = useState({})
  // const [tags, setTags] = useState([])

  const points = [
    {id: 1, value: 0},
    {id: 2, value: 1},
    {id: 3, value: 2},
    {id: 4, value: 4},
    {id: 5, value: 8},
  ]
  return (
    <ActionbarContainer>
      <SwitchContainer>
        <Link to="/my-tasks">
          <RiMenuLine
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
      <form>
        <DialogContainer>
          <Dialog.Trigger asChild>
            <Button>
              <RiAddLine style={{height: '24px', width: '24px'}} />
            </Button>
          </Dialog.Trigger>
          <StyledOverlay />
          <DialogContent>
            <Dialog.Title style={{margin: 0}}>
              <TaskNameInput placeholder="Task Tittle" />
            </Dialog.Title>
            <DropdownContainer>
              <Dropdown.Root>
                <TriggerDropdown>
                  <RiIncreaseDecreaseFill
                    style={{width: '32px', height: '24px', color: 'white'}}
                  />
                  <TriggerLabel>Estimate</TriggerLabel>
                </TriggerDropdown>
                <EstimatedPointsDropdown>
                  <EstimatedPointsItemHeader>
                    Estimate
                  </EstimatedPointsItemHeader>
                  {points.map(point => (
                    <EstimatedPointsItem key={point.id}>
                      <RiIncreaseDecreaseFill
                        style={{width: '32px', height: '26px', color: 'white'}}
                      />
                      <EstimatedPointsItemLabel>
                        {point.value} Points
                      </EstimatedPointsItemLabel>
                    </EstimatedPointsItem>
                  ))}
                </EstimatedPointsDropdown>
              </Dropdown.Root>
              <Dropdown.Root>
                <TriggerDropdown>
                  <RiUser3Fill
                    style={{width: '32px', height: '32px', color: 'white'}}
                  />
                  <TriggerLabel>Assignee</TriggerLabel>
                </TriggerDropdown>
              </Dropdown.Root>
              <Dropdown.Root>
                <TriggerDropdown>
                  <RiPriceTag3Fill
                    style={{width: '24px', height: '32px', color: 'white'}}
                  />
                  <TriggerLabel>Label</TriggerLabel>
                </TriggerDropdown>
              </Dropdown.Root>
            </DropdownContainer>
            <ModalButtonsContainer>
              <Dialog.Close asChild>
                <CancelButton>Cancel</CancelButton>
              </Dialog.Close>
              <Dialog.Close asChild>
                <CreateButton type="submit">Create</CreateButton>
              </Dialog.Close>
            </ModalButtonsContainer>
          </DialogContent>
        </DialogContainer>
      </form>
    </ActionbarContainer>
  )
}

export default ActionBar
