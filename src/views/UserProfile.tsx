/* eslint-disable no-console */
import React from 'react'
import styled, {css} from 'styled-components'
import {gql, useQuery} from '@apollo/client'
import Spinner from '../components/Spinner/Spinner'

interface AvatarProps {
  image: string | null
}

const baseTextStyles = css`
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  letter-spacing: 0.75px;
  color: #ffffff;
  justify-self: flex-end;
`

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
  height: 40rem;
`

const CardProfile = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 32rem;
  min-height: 32rem;
  background: #2c2f33;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  gap: 24px;
`
const UserPrimaryData = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  width: 420px;
  justify-content: space-between;
  align-items: center;
`

const Avatar = styled.div<AvatarProps>`
  height: 64px;
  width: 64px;
  background: url(${props => props.image});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`
const TextHeader = styled.span`
  ${baseTextStyles};
  text-transform: capitalize;
`
const TextContent = styled.span`
  ${baseTextStyles};
  font-weight: 100;
`

const UserProfile = () => {
  const GET_USER = gql`
    query getUser {
      profile {
        avatar
        fullName
        email
        type
        createdAt
        updatedAt
      }
    }
  `
  const {loading, data, error} = useQuery(GET_USER)

  if (loading) return <Spinner />
  if (error) throw new Error(`Error! ${error.message}`)
  return (
    <ProfileContainer>
      <CardProfile>
        {!data.profile.avatar && (
          <Avatar image="https://avatars.dicebear.com/api/initials/mv.svg" />
        )}
        {Object.keys(data.profile)
          .filter(key => key !== '__typename' && key !== 'avatar')
          .map((key, index) => (
            <UserPrimaryData key={index}>
              <TextHeader>{key}</TextHeader>
              <TextContent>{data.profile[key]}</TextContent>
            </UserPrimaryData>
          ))}
      </CardProfile>
    </ProfileContainer>
  )
}

export default UserProfile
