import React from 'react'
import {useMatch} from 'react-router-dom'
import logo from '../../assets/images/WhiteravnLogo.svg'
import {
  SidebarLink,
  SidebarItem,
  SidebarItemName,
  Container,
  Logo,
  SidebarMenu,
  sidebarItems,
} from './SidebarComponents'

interface SidebarComponentProps {
  sidebarItem: {
    name: string
    path: string
    icon: unknown
  }
}

const SidebarLinkComponent = ({sidebarItem}: SidebarComponentProps) => {
  const match = useMatch(sidebarItem.path)

  return (
    <SidebarLink to={sidebarItem.path} match={match}>
      <SidebarItem match={match}>
        {sidebarItem.icon}
        <SidebarItemName>{sidebarItem.name}</SidebarItemName>
      </SidebarItem>
    </SidebarLink>
  )
}

const Sidebar = () => {
  return (
    <Container>
      <Logo src={logo} />
      <SidebarMenu>
        {sidebarItems.map(sidebarItem => (
          <SidebarLinkComponent
            key={sidebarItem.id}
            sidebarItem={sidebarItem}
          />
        ))}
      </SidebarMenu>
    </Container>
  )
}

export default Sidebar
