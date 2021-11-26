import React, {createContext, useContext, useState, useEffect} from 'react'
import {gql, useQuery} from '@apollo/client'

interface UserProps {
  avatar: string | null
  createdAt: string | null
  email: string | null
  fullName: string | null
  id: string | null
  type: string | null
  updatedAt: string | null
}

const AuthContext = createContext<{user: UserProps} | undefined>(undefined)

function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth debe renderizarse con AuthProvider`)
  }
  return context
}
const GET_USER = gql`
  query getUser {
    profile {
      id
      avatar
      email
      fullName
      type
    }
  }
`
// try to avoid any
function AuthProvider({children}: any) {
  const [user, setUser] = useState<UserProps>(() =>
    JSON.parse(localStorage.getItem('user') || '{}'),
  )
  const {loading, data, error} = useQuery(GET_USER)

  useEffect(() => {
    const initialize = () => {
      if (data !== undefined) {
        setUser(data)
      }
      if (loading) return 'Loading...'
      if (error) return `Error! ${error.message}`
    }
    initialize()
  }, [])

  const value = {
    user,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export {useAuth, AuthProvider}
