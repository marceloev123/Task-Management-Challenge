//Assgin Label Color by Tag
export const assignLabelColor = (tag: string) => {
  switch (tag) {
    case 'IOS':
      return '#70B252'
      break
    case 'ANDROID':
      return '#E5B454;'
      break
    case 'REACT':
      return '#2F61BF'
      break
    case 'NODE':
      return '#FFFFFF'
      break
    case 'RAILS':
      return '#DA584B'
      break
    default:
      return '#FFFFFF'
      break
  }
}
// Assign Background by Tag
export const assignBackground = (tag: string) => {
  switch (tag) {
    case 'IOS':
      return 'rgba(112, 178, 82, 0.1)'
      break
    case 'ANDROID':
      return 'rgba(229, 180, 84, 0.1);'
      break
    case 'REACT':
      return 'rgba(47, 97, 191, 0.1)'
      break
    case 'NODE':
      return 'rgba(148, 151, 154, 0.1)'
      break
    case 'RAILS':
      return 'rgba(218, 88, 75, 0.1)'
      break
    default:
      return 'rgba(148, 151, 154, 0.1)'
      break
  }
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
  const dateObject = new Date(date)
  const day = dateObject.getDate()
  const monthIndex = dateObject.getMonth()
  const monthName = monthNames[monthIndex]?.toUpperCase()
  const year = dateObject.getFullYear()
  return `${day} ${monthName}, ${year}`
}
