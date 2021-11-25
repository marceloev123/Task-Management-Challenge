import React from 'react'
import styled from 'styled-components'

interface LabelContainerProps {
  background: string
}

const LabelContainer = styled.div<LabelContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 32px;
  background: ${props => props.background};
  border-radius: 4px;
  color: ${props => props.color};
  padding-left: 4px;
  padding-right: 4px;
`
const LabelText = styled.label`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.75px;
  line-height: 24px;
  margin-right: 4px;
`
interface LabelProps {
  background: string
  color: string
  text: string
  icon?: unknown
}

const LabelIcon = ({background, color, text, icon}: LabelProps) => {
  return (
    <LabelContainer background={background} color={color}>
      {icon}
      <LabelText>{text}</LabelText>
    </LabelContainer>
  )
}

export default LabelIcon
