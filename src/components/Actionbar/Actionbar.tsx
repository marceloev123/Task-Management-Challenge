import React, {useRef, useState} from 'react'
import {Link, useMatch} from 'react-router-dom'
import {useQuery, useMutation} from '@apollo/client'
import * as Dialog from '@radix-ui/react-dialog'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import {ToastContainer, toast} from 'react-toastify'
import {
  RiAddLine,
  RiFunctionLine,
  RiIncreaseDecreaseFill,
  RiMenuLine,
  RiUser3Fill,
  RiPriceTag3Fill,
} from 'react-icons/ri'
import {GET_TASKS, GET_USERS} from '../../graphql/queries/queries'
import {CREATE_TASK} from '../../graphql/mutations/mutations'
import {PointEstimate, TaskTag} from '../../graphql/schemas'
import 'react-toastify/dist/ReactToastify.css'
import Avatar from '../Avatar'
import {
  ActionbarContainer,
  Button,
  CancelButton,
  CreateButton,
  DialogContainer,
  DialogContent,
  DropdownContainer,
  EstimatedPointsDropdown,
  EstimatedPointsItem,
  EstimatedPointsItemLabel,
  ItemHeader,
  ModalButtonsContainer,
  StyledOverlay,
  SwitchContainer,
  TagCheckbox,
  TagDropdown,
  TagLabel,
  TaskNameInput,
  Trigger,
  TriggerDropdown,
  UserItem,
  UserItemName,
  UsersDropdown,
} from './ActionbarComponents'

//Interfaces
interface User {
  __typename: string
  id: string
  avatar: string
  fullName: string
}

interface TagProps {
  id: number
  value: TaskTag
  onClick?: () => void
}

//Tag method
let selectedTags: Array<TaskTag> = []
const handleCheck = (tagCheck: boolean, value: TaskTag) => {
  if (!tagCheck) {
    selectedTags.push(value)
    selectedTags = [...new Set(selectedTags)]
  } else {
    const idx = selectedTags.indexOf(value)
    selectedTags.splice(idx, 1)
  }
}
const CheckboxIndex = ({value}: TagProps) => {
  const [tagCheck, setTagCheck] = useState(false)

  const handleClick = () => {
    setTagCheck(!tagCheck)
    handleCheck(tagCheck, value)
  }
  return (
    <TagCheckbox>
      <input type="checkbox" defaultValue={value} onClick={handleClick} />
      <TagLabel>{value}</TagLabel>
    </TagCheckbox>
  )
}

const Actionbar = () => {
  const match = useMatch(location.pathname)
  const [estimatedPoints, setEstimatedPoints] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)
  const userInitialState = {
    __typename: '',
    id: '',
    avatar: '',
    fullName: '',
  }

  const [selectedUser, setSelectedUser] = useState<User>(userInitialState)

  // Fetching users
  let filteredUsers: User[] | any[] = []
  const {loading, error, data} = useQuery(GET_USERS)

  //Create Task
  const [createTask, {error: error1}] = useMutation(CREATE_TASK, {
    refetchQueries: [GET_TASKS, 'GetTasks'],
  })

  if (data && !loading) {
    filteredUsers = [
      ...new Set(data?.tasks.map((task: {owner: User}) => task.owner)),
    ]
  }
  if (error) {
    toast.error(`Error: ${error}`, {
      theme: 'dark',
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  } else if (error1) {
    toast.error(`Error: ${error1}`, {
      theme: 'dark',
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  const tasknameRef = useRef<HTMLInputElement>(null)
  const estimatedPointsRef = useRef<HTMLInputElement>(null)
  const tagsLabelsRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: {preventDefault: () => void}) => {
    e.preventDefault()
    //Validate the form
    if (
      tasknameRef.current !== null &&
      estimatedPointsRef.current !== null &&
      tagsLabelsRef.current !== null
    ) {
      const tasknameValue = tasknameRef.current.value
      const estimatedPointsValue = estimatedPointsRef.current.value
      if (estimatedPointsRef.current.value === '') {
        alert('Estimated points are required')
      }
      if (tagsLabelsRef.current.value.length === 0) {
        alert('Tags labels are required')
      }
      // Make the request
      try {
        await createTask({
          variables: {
            name: tasknameValue,
            pointEstimate: estimatedPointsValue,
            tags: selectedTags,
          },
        })
      } catch (e) {
        toast.error('Error on create task', {
          theme: 'dark',
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      } finally {
        clearFields()
        toast.success('Task created succesfully!', {
          theme: 'dark',
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    }
  }

  // Points Data
  const estimatedPointsData = {
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    FOUR: 4,
    EIGHT: 8,
  }

  //Modals aux functions
  const openDropdownMenu = () => {
    setOpenDropdown(!openDropdown)
  }

  const openDialog = () => {
    setOpenModal(!openModal)
  }

  const clearFields = () => {
    setOpenModal(!openModal)
    setEstimatedPoints('')
    setSelectedUser(userInitialState)
    selectedTags = []
  }

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

        <DialogContainer open={openModal}>
          <Dialog.Trigger asChild onClick={openDialog}>
            <Button type="button">
              <RiAddLine style={{height: '24px', width: '24px'}} />
            </Button>
          </Dialog.Trigger>
          <StyledOverlay onClick={clearFields} />
          <DialogContent>
            <form
              onSubmit={e => handleSubmit(e)}
              id="createTaskForm"
              style={{display: 'flex', flexDirection: 'column', gap: '24px'}}
            >
              <Dialog.Title style={{margin: 0}}>
                <TaskNameInput
                  placeholder="Task Tittle"
                  id="taskname"
                  type="text"
                  ref={tasknameRef}
                  form="createTaskForm"
                  required
                />
              </Dialog.Title>
              <DropdownContainer>
                <Dropdown.Root>
                  <TriggerDropdown>
                    <RiIncreaseDecreaseFill
                      style={{width: '32px', height: '24px', color: 'white'}}
                    />
                    <Trigger
                      value={estimatedPoints}
                      form="createTaskForm"
                      disabled
                      placeholder="Estimate"
                      onChange={() => setEstimatedPoints(estimatedPoints)}
                      ref={estimatedPointsRef}
                      required
                    />
                  </TriggerDropdown>
                  <EstimatedPointsDropdown>
                    <ItemHeader>Estimate</ItemHeader>
                    {(
                      Object.keys(PointEstimate) as Array<
                        keyof typeof PointEstimate
                      >
                    ).map((key, idx) => (
                      <EstimatedPointsItem
                        key={idx}
                        onClick={() => setEstimatedPoints(key)}
                      >
                        <RiIncreaseDecreaseFill
                          style={{
                            width: '32px',
                            height: '26px',
                            color: 'white',
                          }}
                        />
                        <EstimatedPointsItemLabel>
                          {estimatedPointsData[key]} Points
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
                <Dropdown.Root open={openDropdown}>
                  <TriggerDropdown onClick={openDropdownMenu}>
                    <RiPriceTag3Fill
                      style={{width: '24px', height: '32px', color: 'white'}}
                    />
                    <Trigger
                      value={selectedTags}
                      placeholder="Label"
                      disabled
                      ref={tagsLabelsRef}
                    />
                  </TriggerDropdown>
                  <TagDropdown>
                    <ItemHeader onClick={() => setOpenDropdown(false)}>
                      Tag Title
                    </ItemHeader>
                    <Dropdown.Group
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      {(
                        Object.keys(TaskTag) as Array<keyof typeof TaskTag>
                      ).map((key, idx) => (
                        <CheckboxIndex
                          id={idx}
                          key={idx}
                          value={TaskTag[key]}
                        />
                      ))}
                    </Dropdown.Group>
                  </TagDropdown>
                </Dropdown.Root>
              </DropdownContainer>
              <ModalButtonsContainer>
                <Dialog.Close asChild>
                  <CancelButton type="button" onClick={clearFields}>
                    Cancel
                  </CancelButton>
                </Dialog.Close>

                <CreateButton type="submit" form="createTaskForm">
                  Create
                </CreateButton>
              </ModalButtonsContainer>
            </form>
          </DialogContent>
        </DialogContainer>
      </ActionbarContainer>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default Actionbar
