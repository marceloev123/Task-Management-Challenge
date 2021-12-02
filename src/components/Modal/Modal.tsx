import React from 'react'
import {DialogContainer, StyledOverlay} from './ModalComponents'

interface ModalProps {
  show: boolean
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined
  onClick: () => void
}

const Modal = ({show, children, onClick}: ModalProps) => {
  return (
    <>
      {show ? <StyledOverlay onClick={onClick} /> : null}
      <DialogContainer
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0',
        }}
      >
        {children}
      </DialogContainer>
    </>
  )
}

export default Modal
