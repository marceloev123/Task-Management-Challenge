import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {useQuery, useMutation} from '@apollo/client'
import {toast} from 'react-toastify'
import {
  RiIncreaseDecreaseFill,
  RiUser3Fill,
  RiPriceTag3Fill,
  RiCloseCircleLine,
} from 'react-icons/ri'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {PointEstimate, Status, TaskTag} from '../../../graphql/schemas'
import {GET_TASKS, GET_USERS} from '../../../graphql/queries/queries'
import {CREATE_TASK} from '../../../graphql/mutations/mutations'
import {
  DropdownContainer,
  DropdownInput,
  TriggerDropdown,
  DropdownContent,
  ItemHeader,
  ReusableDropdownItem,
  ItemLabel,
  UsersDropdown,
  UserItem,
  UserName,
  TagDropdown,
  ModalButtonsContainer,
  CancelButton,
  CreateButton,
  TagCheckbox,
  TagLabel,
  ErrorMessages,
} from '../ModalComponents'
import Avatar from '../../Avatar'
import {DialogContainer, StyledOverlay, TaskNameInput} from '../ModalComponents'

//Interfaces
interface ModalProps {
  show: boolean
  onClick: () => void
}

interface FormdataProps {
  taskTitle: string
  pointsEstimated: string
  tagLabels: string[]
  status: string
}
interface TagProps {
  id: number
  value: TaskTag
  selectedTags: Array<TaskTag>
  setSelectedTags: Dispatch<SetStateAction<TaskTag[]>>
  onClick?: () => void
}

interface User {
  __typename: string
  id: string
  avatar: string
  fullName: string
}

const Checkbox = ({value, selectedTags, setSelectedTags}: TagProps) => {
  const [tagCheck, setTagCheck] = useState(selectedTags.includes(value))
  const handleCheck = (tagCheck: boolean, value: TaskTag) => {
    if (!tagCheck) {
      setSelectedTags(prev => {
        const tagList = [...prev, value]
        return [...new Set(tagList)]
      })
    } else {
      setSelectedTags(prev => {
        const tagList = [...prev]
        const idx = tagList.indexOf(value)
        tagList.splice(idx, 1)
        return [...tagList]
      })
    }
  }
  const handleClick = () => {
    setTagCheck(!tagCheck)
    handleCheck(tagCheck, value)
  }
  return (
    <TagCheckbox>
      <input type="checkbox" checked={tagCheck} onClick={handleClick} />
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
    status: yup.string().required(),
  })
  .required()

//MODAL
const ModalCreate = ({show, onClick}: ModalProps) => {
  const [openDropdown, setOpenDropdown] = useState(false)
  const [selectedTags, setSelectedTags] = useState<Array<TaskTag>>([])
  const userInitialState = {
    __typename: '',
    id: '',
    avatar: '',
    fullName: '',
  }
  const [selectedUser, setSelectedUser] = useState<User>(userInitialState)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  })

  //Have to improve
  let filteredUsers: User[] | any[] = []
  const {loading, error, data} = useQuery(GET_USERS)

  //Create Task Mutation
  const [createTask, {error: error1}] = useMutation(CREATE_TASK, {
    refetchQueries: [GET_TASKS],
  })

  if (data && !loading) {
    filteredUsers = [
      ...new Set(data?.tasks.map((task: {owner: User}) => task.owner)),
    ]
  }
  if (error) {
    toast.error(`Error on Fetching Users:  ${error}`, {
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
  if (error1) {
    toast.error(`Error on Create Task: ${error1}`, {
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

  //DropdownMenu open Function
  const openDropdownMenu = () => {
    setOpenDropdown(!openDropdown)
  }

  //DropdownMenu clearFields Function
  const clearFields = () => {
    setSelectedUser(userInitialState)
    setSelectedTags([])
    reset()
    onClick()
  }

  //CREATE TASK SUBMIT
  async function createTaskSubmit(formData: FormdataProps) {
    // Make the request
    try {
      await createTask({
        variables: {
          name: formData.taskTitle,
          pointEstimate: formData.pointsEstimated,
          tags: formData.tagLabels,
          status: formData.status,
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
  }, [register])

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
                    <DropdownInput
                      disabled
                      placeholder="Estimate"
                      {...register('pointsEstimated')}
                    />
                  </TriggerDropdown>
                  {errors.pointsEstimated && (
                    <ErrorMessages>
                      *{errors.pointsEstimated.message}
                    </ErrorMessages>
                  )}
                </div>

                <DropdownContent>
                  <ItemHeader style={{marginLeft: '16px', marginTop: '8px'}}>
                    Estimate
                  </ItemHeader>
                  {(
                    Object.keys(PointEstimate) as Array<
                      keyof typeof PointEstimate
                    >
                  ).map((key, idx) => (
                    <ReusableDropdownItem
                      key={idx}
                      onClick={() => {
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
                      <ItemLabel>{estimatedPointsData[key]} Points</ItemLabel>
                    </ReusableDropdownItem>
                  ))}
                </DropdownContent>
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
                    <DropdownInput
                      value={selectedUser.fullName}
                      disabled
                      placeholder="Assignee"
                      onChange={() => setSelectedUser(selectedUser)}
                    />
                  </TriggerDropdown>
                </div>

                <UsersDropdown>
                  <ItemHeader style={{marginLeft: '16px', marginTop: '8px'}}>
                    Assign To
                  </ItemHeader>
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
                      <UserName>{user.fullName}</UserName>
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
                    <DropdownInput
                      placeholder="Label"
                      disabled
                      value={selectedTags}
                    />
                  </TriggerDropdown>
                  {errors.tagLabels && (
                    <ErrorMessages>*{errors.tagLabels?.message}</ErrorMessages>
                  )}
                </div>

                <TagDropdown>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingLeft: '16px',
                      paddingTop: '8px',
                      paddingRight: '8px',
                    }}
                  >
                    <ItemHeader>Tag Title</ItemHeader>
                    <RiCloseCircleLine
                      style={{
                        width: '32px',
                        height: '32px',
                        color: '#94979a',
                        cursor: 'pointer',
                      }}
                      onClick={() => setOpenDropdown(false)}
                    />
                  </div>
                  <Dropdown.Group
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    {(Object.keys(TaskTag) as Array<keyof typeof TaskTag>).map(
                      (key, idx) => (
                        <Checkbox
                          id={idx}
                          key={idx}
                          value={TaskTag[key]}
                          setSelectedTags={setSelectedTags}
                          selectedTags={selectedTags}
                        />
                      ),
                    )}
                  </Dropdown.Group>
                </TagDropdown>
              </Dropdown.Root>
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
                    <DropdownInput
                      disabled
                      placeholder="Status"
                      {...register('status')}
                    />
                  </TriggerDropdown>
                  {errors.status && (
                    <ErrorMessages>*{errors.status.message}</ErrorMessages>
                  )}
                </div>

                <DropdownContent>
                  <ItemHeader style={{marginLeft: '16px', marginTop: '8px'}}>
                    Status
                  </ItemHeader>
                  {(Object.keys(Status) as Array<keyof typeof Status>).map(
                    (key, idx) => (
                      <ReusableDropdownItem
                        key={idx}
                        onClick={() => {
                          setValue('status', key)
                        }}
                      >
                        <ItemLabel>{Status[key]}</ItemLabel>
                      </ReusableDropdownItem>
                    ),
                  )}
                </DropdownContent>
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

export default ModalCreate
