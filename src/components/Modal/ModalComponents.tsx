import styled from 'styled-components'

export const StyledOverlay = styled.div`
  background: rgba(0, 0, 0, 0.15);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  cursor: pointer;
`
export const DialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 500px;
  padding: 16px;
  z-index: 500;
  background-color: #393d41;
  border-radius: 8px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px hsl(206 22% 7% / 20%) 0px
    10px 20px -15px;
  position: fixed;
  top: 16%;
  left: 40%;
  transition: all 0.3s ease-out;
`
export const TaskNameInput = styled.input`
  background: transparent;
  height: 32px;
  color: #94979a;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  letter-spacing: 0.75px;
  border: none;
  :focus {
    outline: none;
    background-color: transparent;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-transition: 'color 9999s ease-out, background-color 9999s ease-out';
    -webkit-transition-delay: 9999s;
  }
`
