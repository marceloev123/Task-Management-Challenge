import React, {useState} from 'react'
import {BsSearch} from 'react-icons/bs'
import {RiNotification3Line} from 'react-icons/ri'
import {IoMdCloseCircleOutline} from 'react-icons/io'
import Avatar from '../Avatar'
import {
  SearchbarContainer,
  SearchInputContainer,
  InputSearch,
  UserActions,
} from './SearchbarComponents'

const Navbar = () => {
  const [searchWords, setSearchWords] = useState('')
  return (
    <SearchbarContainer>
      <BsSearch
        style={{
          minHeight: '16px',
          minWidth: '16px',
          marginLeft: '26px',
          marginRight: '25.69px',
          color: '#94979A',
        }}
      />
      <SearchInputContainer>
        <InputSearch
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
      </SearchInputContainer>
      <UserActions>
        <RiNotification3Line
          style={{
            height: '20px',
            width: '20px',
            marginRight: '26px',
            color: '#94979A',
          }}
        />
        <Avatar
          image="https://avatars.dicebear.com/api/initials/mv.svg"
          height="32px"
          width="32px"
        />
      </UserActions>
    </SearchbarContainer>
  )
}

export default Navbar
