import styled, {css} from 'styled-components'
import {NavLink} from 'react-router-dom'
import {RiFunctionLine, RiMenuLine, RiUser3Line} from 'react-icons/ri'

// trying to avoid any
interface SidebarLinkProps {
  match: any
}

interface SidebarItem {
  match: unknown
}
export const Container = styled.div`
  width: 232px;
  margin: 32px;
  border-radius: 24px;
  background-color: #2c2f33;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease 0s;
  -webkit-transition: all 0.5s ease 0s;
  position: static;
  @media (max-width: 1898px) {
    width: 104px;
    transition: all 0.5 ease;
  }
`
export const Logo = styled.img`
  height: 36px;
  width: 39.62px;
  margin: 14px auto 46px auto;
`
export const SidebarMenu = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: none;
  padding-inline-start: 0;
  margin-block-start: 0;
  margin-block-end: 0;
`

export const SidebarItem = styled.li<SidebarItem>`
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 0px 0px 16px;
  margin: 8px 0px;
  color: ${props => (props.match ? '#da584b' : ' #94979a')};
  @media (max-width: 1898px) {
    justify-content: center;
    align-items: center;
    margin-left: 24px;
  }
`

export const SidebarItemName = styled.span`
  font-size: 16px;
  line-height: 24px;
  font-style: normal;
  font-weight: 600;
  font-family: 'SF Pro Display Regular';
  letter-spacing: 0.75px;
  margin-left: 19px;
  @media (max-width: 1898px) {
    display: none;
  }
`

// Active Routing Link

export const SidebarLink = styled(NavLink)<SidebarLinkProps>`
  text-decoration: none;
  display: flex;
  ${props =>
    props.match &&
    css`
      &:after {
        width: 4px;
        height: 72px;
        border-radius: 0 7px 7px 0;
        background-color: #da584b;
        content: '';
        margin-left: auto;
      }
    `}

  background: ${props =>
    props.match
      ? 'linear-gradient(90deg, rgba(186, 37, 37, 0) 0%, rgba(210, 77, 77, 0.1) 100%)'
      : 'transparent'};
`

// Routes
export const sidebarItems = [
  {
    id: 1,
    icon: (
      <RiFunctionLine
        style={{
          height: '24px',
          width: '24px',
          backgroundColor: 'transparent',
        }}
      />
    ),
    name: 'DASHBOARD',
    path: '/',
  },
  {
    id: 2,
    icon: (
      <RiMenuLine
        style={{
          height: '24px',
          width: '24px',
          backgroundColor: 'transparent',
        }}
      />
    ),
    name: 'MY TASK',
    path: '/my-tasks',
  },
  {
    id: 3,
    icon: (
      <RiUser3Line
        style={{
          height: '24px',
          width: '24px',
          backgroundColor: 'transparent',
        }}
      />
    ),
    name: 'MY PROFILE',
    path: '/profile',
  },
]
