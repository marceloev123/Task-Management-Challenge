/* eslint-disable no-console */
import React, {useEffect, useState} from 'react'
import {useQuery, useMutation} from '@apollo/client'
import {toast} from 'react-toastify'
import {
  RiIncreaseDecreaseFill,
  RiUser3Fill,
  RiPriceTag3Fill,
} from 'react-icons/ri'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {PointEstimate, TaskTag} from '../../../graphql/schemas'
import {GET_TASKS, GET_USERS} from '../../../graphql/queries/queries'
import {UPDATE_TASK} from '../../../graphql/mutations/mutations'
import {
  ErrorMessages,
  DropdownContainer,
  Trigger,
  TriggerDropdown,
  EstimatedPointsDropdown,
  ItemHeader,
  EstimatedPointsItem,
  EstimatedPointsItemLabel,
  UsersDropdown,
  UserItem,
  UserItemName,
  TagDropdown,
  ModalButtonsContainer,
  CancelButton,
  CreateButton,
  TagCheckbox,
  TagLabel,
} from '../ModalComponents'
import Avatar from '../../Avatar'
import {DialogContainer, StyledOverlay, TaskNameInput} from '../ModalComponents'

//Interfaces

interface FormdataProps {
  taskTitle: string
  pointsEstimated: string
  tagLabels: string[]
}
interface TagProps {
  id: number
  value: TaskTag
  onClick?: () => void
}
interface User {
  __typename: string
  id: string
  avatar: string | null
  fullName: string
}

interface TaskProps {
  createdAt: string
  dueDate: string
  id: string
  name: string
  owner: User
  pointEstimate: string
  position: string
  status: string
  tags: string[]
}
interface ModalProps {
  task: TaskProps
  show: boolean
  onClick: () => void
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

// Points Data
const estimatedPointsData = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  FOUR: 4,
  EIGHT: 8,
}

//Form validation
const schema = yup
  .object({
    taskTitle: yup.string().required(),
    pointsEstimated: yup.string().required(),
    tagLabels: yup.array().min(1).required(),
  })
  .required()

//MODAL

const ModalUpdate = ({task, show, onClick}: ModalProps) => {
  const [estimatedPoints, setEstimatedPoints] = useState('')
  const [openDropdown, setOpenDropdown] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      taskTitle: task?.name,
      pointsEstimated: task?.pointEstimate,
      tagLabels: task?.tags,
    },
  })
  const userInitialState = {
    __typename: '',
    id: '',
    avatar: '',
    fullName: '',
  }

  const [selectedUser, setSelectedUser] = useState<User>(userInitialState)

  //Have to improve
  let filteredUsers: User[] | any[] = []
  const {loading, error, data} = useQuery(GET_USERS)
  //Create Task
  const [createTask, {error: error1}] = useMutation(UPDATE_TASK, {
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

  //Modals aux functions
  const openDropdownMenu = () => {
    setOpenDropdown(!openDropdown)
  }

  const clearFields = () => {
    setEstimatedPoints('')
    setSelectedUser(userInitialState)
    selectedTags = []
    reset()
    onClick()
  }

  async function createTaskSubmit(formData: FormdataProps) {
    // Make the request
    try {
      await createTask({
        variables: {
          name: formData.taskTitle,
          pointEstimate: formData.pointsEstimated,
          tags: formData.tagLabels,
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

  useEffect(() => {
    register('pointsEstimated', {required: true})
    register('tagLabels', {required: true})
  }, [register, task])

  useEffect(() => {
    setValue('tagLabels', selectedTags)
  }, [selectedTags])

  return (
    <>
      {show ? <StyledOverlay onClick={onClick} /> : null}
      <DialogContainer
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0',
        }}
      >
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
                      onClick={() => {
                        setEstimatedPoints(key)
                        setValue('pointsEstimated', key)
                      }}
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
                    />
                  </TriggerDropdown>
                  {errors.tagLabels && <ErrorMessages>*Error </ErrorMessages>}
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
                    {(Object.keys(TaskTag) as Array<keyof typeof TaskTag>).map(
                      (key, idx) => (
                        <CheckboxIndex
                          id={idx}
                          key={idx}
                          value={TaskTag[key]}
                        />
                      ),
                    )}
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
      </DialogContainer>
    </>
  )
}

export default ModalUpdate
