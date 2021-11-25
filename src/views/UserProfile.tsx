import React from 'react'
import styled from 'styled-components'

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
  min-height: 24rem;
  background: #2c2f33;

  border-radius: 16px;
  align-items: center;
  justify-content: center;
  gap: 16px;
`
const UserPrimaryData = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  width: 420px;
  justify-content: space-between;
  align-items: center;
`

const Avatar = styled.div`
  height: 40px;
  width: 40px;
  background: white;
  border-radius: 50%;
`
const TextHeader = styled.span`
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  letter-spacing: 0.75px;
  color: #ffffff;
  justify-self: flex-end;
`
const TextContent = styled.span`
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.75px;
  color: #ffffff;
  justify-self: flex-end;
`

const UserProfile = () => {
  return (
    <ProfileContainer>
      <CardProfile>
        <UserPrimaryData>
          <Avatar />
          <TextContent>NAME</TextContent>
        </UserPrimaryData>
        <UserPrimaryData>
          <TextHeader>Email</TextHeader>
          <TextContent>dsasda@ravn.co</TextContent>
        </UserPrimaryData>
        <UserPrimaryData>
          <TextHeader>Type</TextHeader>
          <TextContent>dsasda@ravn.co</TextContent>
        </UserPrimaryData>
        <UserPrimaryData>
          <TextHeader>Position</TextHeader>
          <TextContent>dsasda@ravn.co</TextContent>
        </UserPrimaryData>
        <UserPrimaryData>
          <TextHeader>CreatedAt</TextHeader>
          <TextContent>dsasda@ravn.co</TextContent>
        </UserPrimaryData>
        <UserPrimaryData>
          <TextHeader>UpdatedAt</TextHeader>
          <TextContent>dsasda@ravn.co</TextContent>
        </UserPrimaryData>
      </CardProfile>
    </ProfileContainer>
  )
}

export default UserProfile
