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
  background: ${props => props.background};
  border-radius: 4px;
  padding: 4px 16px;
  color: ${props => props.color};
`
const LabelText = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  flex-basis: 100%;
  max-width: 92px;
  margin: 0;
  padding: 0;
  text-align: center;
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
