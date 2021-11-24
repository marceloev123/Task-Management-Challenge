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
  width: 92px;
  height: 32px;
  background: ${props => props.background};
  border-radius: 4px;
  padding: 4px 16px;
  color: ${props => props.color};
`
const LabelText = styled.label`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
`
interface LabelProps {
  background: string
  color: string
  text: string
}

const Label = ({background, color, text}: LabelProps) => {
  return (
    <LabelContainer background={background} color={color}>
      <LabelText>{text}</LabelText>
    </LabelContainer>
  )
}

export default Label
