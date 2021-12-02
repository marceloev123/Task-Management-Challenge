/* eslint-disable no-console */
import React, {useState, useEffect} from 'react'
import {Link, useMatch} from 'react-router-dom'
import {useQuery, useMutation} from '@apollo/client'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
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
import Modal from '../Modal/Modal'
import {
  ActionbarContainer,
  Button,
  CancelButton,
  CreateButton,
  DropdownContainer,
  ErrorMessages,
  EstimatedPointsDropdown,
  EstimatedPointsItem,
  EstimatedPointsItemLabel,
  ItemHeader,
  ModalButtonsContainer,
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

//Form validation
const schema = yup
  .object({
    taskTitle: yup.string().required(),
    pointsEstimated: yup.string().required(),
    tagLabels: yup.array().min(1).required(),
  })
  .required()

const Actionbar = () => {
  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  })

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

  async function createTaskSubmit() {
    //Fetch data from form

    const formDataValues = getValues([
      'taskTitle',
      'pointsEstimated',
      'tagLabels',
    ])

    // Make the request
    try {
      await createTask({
        variables: {
          name: formDataValues[0],
          pointEstimate: formDataValues[1],
          tags: formDataValues[2],
        },
      })
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

  const clearFields = () => {
    clearErrors()
    setOpenModal(!openModal)
    setEstimatedPoints('')
    setSelectedUser(userInitialState)
    selectedTags = []
    reset()
  }

  useEffect(() => {
    register('pointsEstimated', {required: true})
    register('tagLabels', {required: true})
  }, [register])

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
          <Modal show={openModal} onClick={clearFields}>
            <form
              onSubmit={handleSubmit(createTaskSubmit)}
              style={{display: 'flex', flexDirection: 'column', gap: '24px'}}
            >
              <TaskNameInput
                placeholder="Task Title"
                type="text"
                {...register('taskTitle')}
              />

              {errors.taskTitle && (
                <ErrorMessages> *{errors.taskTitle.message}</ErrorMessages>
              )}
              <>
                <DropdownContainer>
                  <Dropdown.Root>
                    <div>
                      <TriggerDropdown>
                        <RiIncreaseDecreaseFill
                          style={{
                            width: '32px',
                            height: '24px',
                            color: 'white',
                          }}
                        />
                        <Trigger
                          disabled
                          placeholder="Estimate"
                          value={estimatedPoints}
                          {...setValue('pointsEstimated', estimatedPoints)}
                          onChange={() => {
                            setValue('pointsEstimated', estimatedPoints)
                          }}
                        />
                      </TriggerDropdown>
                      {errors.pointsEstimated && (
                        <ErrorMessages>
                          *{errors.pointsEstimated.message}
                        </ErrorMessages>
                      )}
                    </div>

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
                    <div>
                      <TriggerDropdown>
                        <RiUser3Fill
                          style={{
                            width: '32px',
                            height: '32px',
                            color: 'white',
                          }}
                        />
                        <Trigger
                          value={selectedUser.fullName}
                          disabled
                          placeholder="Assignee"
                          onChange={() => setSelectedUser(selectedUser)}
                        />
                      </TriggerDropdown>
                    </div>

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
                            image={
                              user.avatar ||
                              'https://avatars.dicebear.com/api/initials/mv.svg'
                            }
                          />
                          <UserItemName>{user.fullName}</UserItemName>
                        </UserItem>
                      ))}
                    </UsersDropdown>
                  </Dropdown.Root>
                  <Dropdown.Root open={openDropdown}>
                    <div>
                      <TriggerDropdown onClick={openDropdownMenu}>
                        <RiPriceTag3Fill
                          style={{
                            width: '24px',
                            height: '32px',
                            color: 'white',
                          }}
                        />
                        <Trigger
                          placeholder="Label"
                          disabled
                          value={selectedTags}
                          {...setValue('tagLabels', selectedTags)}
                          onChange={() => {
                            setValue('tagLabels', selectedTags)
                          }}
                        />
                      </TriggerDropdown>
                      {errors.tagLabels && (
                        <ErrorMessages>
                          *{errors.tagLabels?.message}
                        </ErrorMessages>
                      )}
                    </div>

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
              </>
              <ModalButtonsContainer>
                <CancelButton onClick={clearFields}>Cancel</CancelButton>

                <CreateButton type="submit">Create</CreateButton>
              </ModalButtonsContainer>
            </form>
          </Modal>
          <Button onClick={() => setOpenModal(!openModal)}>
            <RiAddLine style={{height: '24px', width: '24px'}} />
          </Button>
        </>
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
