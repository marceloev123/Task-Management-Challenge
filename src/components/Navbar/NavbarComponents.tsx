import styled from 'styled-components'

export const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 56px;
  flex-basis: 1108px;
  padding-right: 0.8rem;
  border-radius: 16px;
  background-color: #2c2f33;
  align-items: center;
  margin-top: 32px;
  margin-right: 32px;
  justify-content: space-between;
`

export const UserActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 24px;
  margin-left: 28px;
`

export const NavSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 24px;
`

export const NavInputSearch = styled.input`
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
