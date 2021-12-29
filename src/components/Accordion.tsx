import * as AccordionPrimitive from '@radix-ui/react-accordion'
import styled from 'styled-components'

const AccordionContainer = styled(AccordionPrimitive.Root)`
  border-radius: 8px;
  width: 100%;
`
const AccordionItem = styled(AccordionPrimitive.Item)`
  height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Accordion = () => {
  return (
    <AccordionContainer type="single" defaultValue="item-1">
      <AccordionItem value="item-1"></AccordionItem>
    </AccordionContainer>
  )
}

export default Accordion
