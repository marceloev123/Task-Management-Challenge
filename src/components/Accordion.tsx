import React from 'react'
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

// const TableHeaderItem = styled.div`
//   height: 56px;
//   display: flex;
//   align-items: center;
//   border-left: 1px solid#393d41;
//   align-items: center;
// `
// const AccordionTriggerContainer = styled(AccordionPrimitive.Trigger)`
//   display: flex;
// `

// const AccordionTrigger = React.forwardRef(
//   ({children, ...props}, forwardedRef) => (
//     <TableHeaderItem>
//       <AccordionTriggerContainer {...props}>
//         {children}
//       </AccordionTriggerContainer>
//     </TableHeaderItem>
//   ),
// )

const Accordion = () => {
  return (
    <AccordionContainer type="single" defaultValue="item-1">
      <AccordionItem value="item-1"></AccordionItem>
    </AccordionContainer>
  )
}

export default Accordion
