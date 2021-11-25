import React, {useState} from 'react'
import styled from 'styled-components'
import {BsSearch} from 'react-icons/bs'
import {RiNotification3Line} from 'react-icons/ri'
import {IoMdCloseCircleOutline} from 'react-icons/io'

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 64px;
  flex-basis: 1108px;
  border-radius: 16px;
  background-color: #2c2f33;
  align-items: center;
  margin-top: 32px;
  margin-right: 36px;
  justify-content: space-between;
`

const UserActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 24px;
  margin-left: 28px;
`

const NavSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 24px;
`

const NavInputSearch = styled.input`
  color: #94979a;
  width: 100%;
  min-width: 4rem;
  font-size: 15px;
  line-height: 24px;
  font-style: normal;
  font-weight: normal;
  background-color: transparent;
  border: none;
  :focus {
    outline: none;
  }
`
const Avatar = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: url('https://avatars.dicebear.com/api/initials/mv.svg');
`

const Navbar = () => {
  const [searchWords, setSearchWords] = useState('')
  return (
    <NavContainer>
      <BsSearch
        style={{
          minHeight: '24px',
          minWidth: '24px',
          marginLeft: '26px',
          marginRight: '25.69px',
          color: '#94979A',
        }}
      />
      <NavSearchContainer>
        <NavInputSearch
          placeholder="Search"
          value={searchWords}
          onChange={e => setSearchWords(e.target.value)}
        />
        {searchWords.length !== 0 && (
          <IoMdCloseCircleOutline
            style={{
              height: '24px',
              width: '24px',
              color: '#94979A',
              cursor: 'pointer',
            }}
            onClick={() => setSearchWords('')}
          />
        )}
      </NavSearchContainer>
      <UserActions>
        <RiNotification3Line
          style={{
            height: '24px',
            width: '24px',
            marginRight: '26px',
            color: '#94979A',
          }}
        />
        <Avatar />
      </UserActions>
    </NavContainer>
  )
}

export default Navbar
