import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {useQuery, useMutation} from '@apollo/client'
import {toast} from 'react-toastify'
import {
  RiIncreaseDecreaseFill,
  RiUser3Fill,
  RiPriceTag3Fill,
  RiCloseCircleLine,
  RiTaskFill,
} from 'react-icons/ri'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import {PointEstimate, Status, TaskTag} from '../../graphql/schemas'
import {GET_TASKS, GET_USERS} from '../../graphql/queries/queries'
import {CREATE_TASK, UPDATE_TASK} from '../../graphql/mutations/mutations'
import Avatar from '../Avatar'
import {
  DropdownContainer,
  DropdownInput,
  TriggerDropdown,
  DropdownContent,
  ItemHeader,
  DropdownItem,
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
  StyledDatePicker,
} from './ModalComponents'
import {DialogContainer, StyledOverlay, TaskNameInput} from './ModalComponents'
//Interfaces
interface TaskProps {
  createdAt: string
  dueDate: string
  id: string
  name: string
  assignee: User
  pointEstimate: string
  position: string
  status: string
  tags: Array<TaskTag>
}
interface ModalProps {
  task?: TaskProps
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
      <input
        type="checkbox"
        checked={tagCheck}
        onClick={handleClick}
        readOnly
      />
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
    assigneeId: yup.string().required(),
    tagLabels: yup.array().min(1).required(),
    status: yup.string().required(),
  })
  .required()

// Date Picker Stlying

const TaskModal = ({task, show, onClick}: ModalProps) => {
  const [openDropdown, setOpenDropdown] = useState(false)
  const [selectedTags, setSelectedTags] = useState<Array<TaskTag>>([])
  const userInitialState = {
    __typename: '',
    id: '',
    avatar: '',
    fullName: '',
  }
  const [selectedUser, setSelectedUser] = useState<User>(userInitialState)
  const [selectedDate, handleDateChange] = useState<Date | null>(
    task ? new Date(task.dueDate) : null,
  )

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      assigneeId: task?.assignee?.fullName || '',
      taskTitle: task?.name || '',
      pointsEstimated: task?.pointEstimate || '',
      tagLabels: task?.tags || [],
      status: task?.status || '',
    },
  })

  //Have to improve
  let filteredUsers: User[] | any[] = []
  const {loading, error: getUsersError, data} = useQuery(GET_USERS)
  //Create Task Mutation
  const [createTask, {error: createTaskError}] = useMutation(CREATE_TASK, {
    refetchQueries: [GET_TASKS],
  })

  //Update Task Mutation
  const [updateTask, {error: updateTaskError}] = useMutation(UPDATE_TASK, {
    refetchQueries: [GET_TASKS],
  })

  if (data && !loading) {
    filteredUsers = [
      ...new Set(
        data?.tasks
          .filter((task: {assignee: User}) => task.assignee)
          .map((task: {assignee: User}) => task.assignee),
      ),
    ]
  }

  //Modals aux functions
  const openDropdownMenu = () => {
    setOpenDropdown(!openDropdown)
  }

  const closeModal = () => {
    if (task) {
      setSelectedTags(task?.tags)
    } else {
      setSelectedTags([])
      handleDateChange(null)
    }
    reset()
    onClick()
  }

  //DropdownMenu clearFields Function
  const clearCreateTaskFields = () => {
    setSelectedUser(userInitialState)
    setSelectedTags([])
    handleDateChange(null)
    reset()
    onClick()
  }

  //Create TaskSubmit
  async function createTaskSubmit(formData: FormdataProps) {
    // Make the request

    try {
      await createTask({
        variables: {
          assigneeId: selectedUser.id,
          name: formData.taskTitle,
          pointEstimate: formData.pointsEstimated,
          tags: formData.tagLabels,
          status: formData.status,
          dueDate: selectedDate?.toISOString(),
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
      clearCreateTaskFields()
    }
  }

  //Update TaskSubmit

  async function updateTaskSubmit(formData: FormdataProps) {
    try {
      await updateTask({
        variables: {
          id: task?.id,
          assigneeId: selectedUser.id,
          name: formData.taskTitle,
          position: task?.position,
          pointEstimate: formData.pointsEstimated,
          status: formData.status,
          tags: formData.tagLabels,
          dueDate: selectedDate?.toISOString(),
        },
      })
      toast.success('Task updated succesfully!', {
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
      toast.error('Error on update task', {
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
      closeModal()
    }
  }

  useEffect(() => {
    if (getUsersError) {
      toast.error(`Error on Fetching Users:  ${getUsersError}`, {
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
    if (createTaskError) {
      toast.error(`Error on Create Task: ${createTaskError}`, {
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
    if (updateTaskError) {
      toast.error(`Error: ${updateTaskError}`, {
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
  }, [])

  useEffect(() => {
    register('pointsEstimated', {required: true})
    register('tagLabels', {required: true})
    register('assigneeId', {required: true})
  }, [register])

  useEffect(() => {
    setValue('tagLabels', selectedTags)
    setValue('assigneeId', selectedUser.fullName)
  }, [selectedTags, selectedUser])

  useEffect(() => {
    if (task) {
      setValue('tagLabels', task.tags)
      setValue('assigneeId', task.assignee.fullName)
      setSelectedUser(task.assignee)
      setSelectedTags(task.tags)
    }
  }, [task])

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <>
        {show ? <StyledOverlay onClick={onClick} /> : null}
        <DialogContainer
          style={{
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0',
            transition: 'all 0.3s ease-out',
          }}
        >
          <form
            onSubmit={handleSubmit(task ? updateTaskSubmit : createTaskSubmit)}
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
                      <DropdownItem
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
                      </DropdownItem>
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
                        disabled
                        placeholder="Assignee"
                        {...register('assigneeId')}
                      />
                    </TriggerDropdown>
                    {errors.assigneeId && (
                      <ErrorMessages>
                        *{errors.assigneeId?.message}
                      </ErrorMessages>
                    )}
                  </div>

                  <UsersDropdown>
                    <ItemHeader style={{marginLeft: '16px', marginTop: '8px'}}>
                      Assign To
                    </ItemHeader>
                    {filteredUsers.map(user => (
                      <UserItem
                        key={user.id}
                        onClick={() => {
                          setSelectedUser(user)
                          setValue('assigneeId', user.fullName)
                        }}
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
                        defaultValue={task?.tags}
                        {...register('tagLabels')}
                      />
                    </TriggerDropdown>
                    {errors.tagLabels && <ErrorMessages>*Error </ErrorMessages>}
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
                      {(
                        Object.keys(TaskTag) as Array<keyof typeof TaskTag>
                      ).map((key, idx) => (
                        <Checkbox
                          id={idx}
                          key={idx}
                          value={TaskTag[key]}
                          setSelectedTags={setSelectedTags}
                          selectedTags={selectedTags}
                        />
                      ))}
                    </Dropdown.Group>
                  </TagDropdown>
                </Dropdown.Root>
                <Dropdown.Root>
                  <div>
                    <TriggerDropdown>
                      <RiTaskFill
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
                        <DropdownItem
                          key={idx}
                          onClick={() => {
                            setValue('status', key)
                          }}
                        >
                          <ItemLabel>{Status[key]}</ItemLabel>
                        </DropdownItem>
                      ),
                    )}
                  </DropdownContent>
                </Dropdown.Root>

                <StyledDatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  placeholder="Due Date"
                  value={selectedDate}
                  onChange={newDate => handleDateChange(newDate)}
                  format="dd/MM/yyyy"
                  required
                />
              </DropdownContainer>
            </>
            <ModalButtonsContainer>
              <CancelButton type="button" onClick={closeModal}>
                Cancel
              </CancelButton>

              <CreateButton type="submit">
                {task ? 'Update' : 'Create'}
              </CreateButton>
            </ModalButtonsContainer>
          </form>
        </DialogContainer>
      </>
    </MuiPickersUtilsProvider>
  )
}

export default TaskModal
