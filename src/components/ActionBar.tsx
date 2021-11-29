import React, {useState} from 'react'
import styled from 'styled-components'
import {Link, useMatch} from 'react-router-dom'
import {gql, useQuery} from '@apollo/client'
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
import Avatar from './Avatar'

//Interfaces

interface User {
  __typename: string
  id: string
  avatar: string
  fullName: string
}
interface Trigger {
  value: null | number | string | undefined | User
}
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
  width: 500px;
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
  width: 100%;
  max-height: 32px;
  gap: 8px;
  padding: 0 12px;
  background: rgba(148, 151, 154, 0.1);
  border-radius: 4px;
  cursor: pointer;
  appearance: none;
  border-style: none;
`

const Trigger = styled.input<Trigger>`
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.75px;
  background-color: transparent;
  border: none;
  color: #ffffff;
  width: 100%;
  &::placeholder {
    color: #ffffff;
  }
`
const ItemHeader = styled.span`
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
  cursor: text;
  &:focus {
    border: none;
  }
`
const EstimatedPointsItem = styled(Dropdown.Item)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding-left: 16px;
  border-radius: 4px;
  cursor: pointer;
  &:focus {
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

//UserDropdown
const UsersDropdown = styled(Dropdown.Content)`
  display: flex;
  margin-top: 12px;
  margin-left: 56px;
  width: 240px;
  flex-direction: column;
  gap: 24px;
  border: 1px solid #94979a;
  padding-bottom: 8px;
  background: #393d41;
  box-sizing: border-box;
  border-radius: 8px;
  z-index: 1;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`
const UserItem = styled(Dropdown.Item)`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  padding: 4px 16px;
  cursor: pointer;
  &:focus {
    background: #94979a;
  }
`

const UserItemName = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  align-items: center;
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
  const [estimatedPoints, setEstimatedPoints] = useState(-1)
  const [selectedUser, setSelectedUser] = useState<User>({
    __typename: '',
    id: '',
    avatar: '',
    fullName: '',
  })
  const [tags, setTags] = useState([])
  let filteredUsers: User[] | any[] = []

  // Points Data
  const points = [
    {id: 1, value: 0},
    {id: 2, value: 1},
    {id: 3, value: 2},
    {id: 4, value: 4},
    {id: 5, value: 8},
  ]

  // Users Data
  const GET_USERS = gql`
    query getUsers {
      tasks(input: {}) {
        owner {
          id
          avatar
          fullName
        }
      }
    }
  `
  const {loading, error, data} = useQuery(GET_USERS)
  if (data) {
    filteredUsers = [
      ...new Set(data?.tasks.map((task: {owner: User}) => task.owner)),
    ]
  }
  if (error) throw new Error(`Error! ${error.message}`)

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
                  <Trigger
                    value={estimatedPoints !== -1 ? estimatedPoints : undefined}
                    disabled
                    placeholder="Estimate"
                    onChange={() => setEstimatedPoints(estimatedPoints)}
                  />
                  {estimatedPoints !== -1 && (
                    <EstimatedPointsItemLabel style={{marginLeft: '-80px'}}>
                      Points
                    </EstimatedPointsItemLabel>
                  )}
                </TriggerDropdown>
                <EstimatedPointsDropdown>
                  <ItemHeader>Estimate</ItemHeader>
                  {points.map(point => (
                    <EstimatedPointsItem
                      key={point.id}
                      onClick={() => setEstimatedPoints(point.value)}
                    >
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
                  <Trigger
                    value={selectedUser.fullName}
                    disabled
                    placeholder="Assignee"
                    onChange={() => setSelectedUser(selectedUser)}
                  />
                </TriggerDropdown>
                <UsersDropdown>
                  <ItemHeader>Assign To</ItemHeader>
                  {filteredUsers.map(user => (
                    <UserItem
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                    >
                      <Avatar
                        width={'32px'}
                        height={'32px'}
                        image={user.avatar}
                      />
                      <UserItemName>{user.fullName}</UserItemName>
                    </UserItem>
                  ))}
                </UsersDropdown>
              </Dropdown.Root>
              <Dropdown.Root>
                <TriggerDropdown>
                  <RiPriceTag3Fill
                    style={{width: '24px', height: '32px', color: 'white'}}
                  />
                  <Trigger value={0} placeholder="Label" />
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
