import React from 'react'
import styled from 'styled-components'

interface AvatarComponentProps {
  width: string
  height: string
  image: string | null
}

const Avatar = styled.div<AvatarComponentProps>`
  height: ${props => props.height};
  width: ${props => props.width};
  background: url(${props => props.image});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`

const AvatarComponent = ({width, height, image}: AvatarComponentProps) => {
  return <Avatar width={width} height={height} image={image} />
}

export default AvatarComponent
