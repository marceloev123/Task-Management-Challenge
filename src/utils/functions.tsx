// Assgin Label Color by Tag
export const assignLabelColor = (tag: string) => {
  switch (tag) {
    case 'IOS':
      return '#70B252'

    case 'ANDROID':
      return '#E5B454;'
    case 'REACT':
      return '#2F61BF'

    case 'NODE':
      return '#FFFFFF'

    case 'RAILS':
      return '#DA584B'

    default:
      return '#FFFFFF'
  }
}
// Assign Background by Tag
export const assignBackground = (tag: string) => {
  switch (tag) {
    case 'IOS':
      return 'rgba(112, 178, 82, 0.1)'
    case 'ANDROID':
      return 'rgba(229, 180, 84, 0.1);'
    case 'REACT':
      return 'rgba(47, 97, 191, 0.1)'
    case 'NODE':
      return 'rgba(148, 151, 154, 0.1)'
    case 'RAILS':
      return 'rgba(218, 88, 75, 0.1)'
    default:
      return 'rgba(148, 151, 154, 0.1)'
  }
}

const isToday = (someDate: Date) => {
  const today = new Date()
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  )
}
const isYesterday = (someDate: Date) => {
  const today = new Date()
  return (
    someDate.getDate() == today.getDate() - 1 &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  )
}

// Function to transform Dates in DD Month, YYYY format
export const formatData = (date: string) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Augyst',
    'September',
    'October',
    'November',
    'December',
  ]
  const dueDate = new Date(date)
  const day = dueDate.getDate()
  const monthIndex = dueDate.getMonth()
  const monthName = monthNames[monthIndex]?.toUpperCase()
  const year = dueDate.getFullYear()
  if (isToday(dueDate)) {
    return 'Today'
  } else if (isYesterday(dueDate)) {
    return 'Yesterday'
  }
  return `${day} ${monthName}, ${year}`
}

// Assign Background by Due Date
export const assignDueDateBackground = (date: string) => {
  const today = new Date()
  const dueDate = new Date(date)
  const daysBetween = Math.round(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  )
  if (daysBetween > 2) {
    return 'rgba(112, 178, 82, 0.1)'
  }
  if (daysBetween === 2) {
    return 'rgba(229, 180, 84, 0.1);'
  }
  return 'rgba(218, 88, 75, 0.1)'
}

export const assignDueDateLabelColor = (date: string) => {
  const today = new Date()
  const dueDate = new Date(date)
  const daysBetween = Math.round(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  )
  if (daysBetween > 2) {
    return '#70B252'
  }
  if (daysBetween === 2) {
    return '#E5B454'
  }
  return '#DA584B'
}
