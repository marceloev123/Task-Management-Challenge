import React from 'react'
import styled from 'styled-components'
import {BiMenu, BiGridAlt} from 'react-icons/bi'
import {NavLink, useMatch} from 'react-router-dom'
import logo from '../../assets/images/WhiteravnLogo.svg'

const Container = styled.div`
  height: calc(100% - 64px);
  width: 232px;
  margin: 32px;
  border-radius: 24px;
  background-color: #2c2f33;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`
const Logo = styled.img`
  height: 36px;
  width: 39.62px;
  margin: 14px auto 46px auto;
`
const SidebarMenu = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: none;
  padding-inline-start: 0;
  margin-block-start: 0;
  margin-block-end: 0;
`

const SidebarItem = styled.li`
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 0px 0px 16px;
  margin: 8px 0px;
`

const SidebarItemName = styled.text`
  font-size: 16px;
  line-height: 24px;
  font-style: normal;
  font-weight: 600;
  font-family: 'SF Pro Display Regular';
  letter-spacing: 0.75px;
  color: #94979a;
  margin-left: 19px;
`

interface SidebarLinkCProps {
  sidebarItem: {
    name: string
    path: string
    icon: unknown
  }
}

const SidebarLinkComponent = ({sidebarItem}: SidebarLinkCProps) => {
  const match = useMatch(sidebarItem.path)

  return (
    <NavLink
      to={sidebarItem.path}
      style={{
        background: match
          ? 'linear-gradient(90deg, rgba(186, 37, 37, 0) 0%, rgba(210, 77, 77, 0.1) 100%)'
          : 'transparent',
      }}
    >
      <SidebarItem>
        {sidebarItem.icon}
        <SidebarItemName>{sidebarItem.name}</SidebarItemName>
      </SidebarItem>
    </NavLink>
  )
}

const Sidebar = () => {
  const sidebarItems = [
    {
      id: 1,
      icon: (
        <BiGridAlt style={{height: '24px', width: '24px', color: '#94979A'}} />
      ),
      name: 'DASHBOARD',
      path: '/',
    },
    {
      id: 2,
      icon: (
        <BiMenu style={{height: '24px', width: '24px', color: '#94979A'}} />
      ),
      name: 'MY TASK',
      path: '/my-tasks',
    },
  ]
  return (
    <Container>
      <Logo src={logo} />
      <SidebarMenu>
        {sidebarItems.map(sidebarItem => (
          <SidebarLinkComponent sidebarItem={sidebarItem} />
        ))}
      </SidebarMenu>
    </Container>
  )
}

export default Sidebar
