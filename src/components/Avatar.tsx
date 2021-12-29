import styled from 'styled-components'

interface AvatarProps {
  id?: string
  width: string
  height: string
  image: string | null
}

interface StyledAvatarProps {
  width: string
  height: string
  image: string | null
}

const StyledAvatar = styled.div<StyledAvatarProps>`
  height: ${props => props.height};
  width: ${props => props.width};
  background: url(${props => props.image});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`

const Avatar = ({id, width, height, image}: AvatarProps) => (
  <StyledAvatar id={id} width={width} height={height} image={image} />
)

export default Avatar
