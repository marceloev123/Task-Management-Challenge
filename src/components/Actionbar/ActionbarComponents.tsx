import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import * as Dropdown from '@radix-ui/react-dropdown-menu'

//Interfaces

interface User {
  __typename: string
  id: string
  avatar: string
  fullName: string
}
interface Trigger {
  value: number | string | undefined | User | string[]
}
//Principal Container
export const ActionbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  flex-basis: 1108px;
  align-items: center;
  margin-top: 32px;
  margin-right: 36px;
  justify-content: space-between;
`

export const SwitchContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: transparent;
  border: none;
  cursor: pointer;
`
//Principal Creation Button
export const Button = styled.button`
  height: 40px;
  width: 40px;
  background-color: #da584b;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`

//Dialog
export const DialogContainer = styled(Dialog.Root)`
  padding: 16px;
`
export const DialogContent = styled(Dialog.Content)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 500px;
  padding: 16px;
  background-color: #393d41;
  border-radius: 8px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px hsl(206 22% 7% / 20%) 0px
    10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -156%);
`
export const StyledOverlay = styled(Dialog.Overlay)`
  background: rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
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
export const DropdownContainer = styled.div`
  display: flex;
  display: row;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
`
export const ModalButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  height: 40px;
  gap: 16px;
`
//Estimated Points Dropdown
export const EstimatedPointsDropdown = styled(Dropdown.Content)`
  display: flex;
  margin-top: 12px;
  width: 132px;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #94979a;
  padding-bottom: 8px;
  background: #393d41;
  box-sizing: border-box;
  border-radius: 8px;
  z-index: 1;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`

export const TriggerDropdown = styled(Dropdown.Trigger)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-height: 32px;
  gap: 8px;
  padding: 0 12px;
  background: rgba(148, 151, 154, 0.1);
  border-radius: 4px;
  cursor: pointer;
  appearance: none;
  border-style: none;
`

export const Trigger = styled.input<Trigger>`
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.75px;
  background-color: transparent;
  border: none;
  color: #ffffff;
  width: 100%;
  &::placeholder {
    color: #ffffff;
  }
`
export const ItemHeader = styled.span`
  display: flex;
  flex-direction: row;
  margin-left: 16px;
  margin-top: 8px;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  letter-spacing: 0.75px;
  color: #94979a;
  cursor: text;
  &:focus {
    border: none;
  }
`
export const EstimatedPointsItem = styled(Dropdown.Item)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding-left: 16px;
  border-radius: 4px;
  cursor: pointer;
  &:focus {
    background: #94979a;
  }
`
export const EstimatedPointsItemLabel = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.75px;
  color: #ffffff;
`

//UserDropdown
export const UsersDropdown = styled(Dropdown.Content)`
  display: flex;
  margin-top: 12px;
  margin-left: 56px;
  width: 240px;
  flex-direction: column;
  gap: 24px;
  border: 1px solid #94979a;
  padding-bottom: 8px;
  background: #393d41;
  box-sizing: border-box;
  border-radius: 8px;
  z-index: 1;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`
export const UserItem = styled(Dropdown.Item)`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  padding: 4px 16px;
  cursor: pointer;
  &:focus {
    background: #94979a;
  }
`
export const UserItemName = styled.span`
  font-style: normal;
  max-width: 120px;
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  align-items: center;
  letter-spacing: 0.75px;
  color: #ffffff;
`
//TagDropdown

export const TagDropdown = styled(Dropdown.Content)`
  display: flex;
  margin-top: 12px;
  margin-left: 40px;
  width: 232px;
  flex-direction: column;
  gap: 24px;
  border: 1px solid #94979a;
  padding-bottom: 8px;
  background: #393d41;
  box-sizing: border-box;
  border-radius: 8px;
  z-index: 1;
`

//Modal Buttons

export const CancelButton = styled.button`
  border: none;
  background: transparent;
  width: 62px;
  height: 40px;
  color: white;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.75px;
  cursor: pointer;
`
export const CreateButton = styled.button`
  border: none;
  background: #da584b;
  width: 62px;
  height: 40px;
  color: white;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.75px;
  cursor: pointer;
  border-radius: 8px;
`

//SELECT
export const TagCheckbox = styled(Dropdown.Item)`
  color: #ffffff;
  display: flex;
  flex-direction: row;
  gap: 11px;
  align-items: center;
  border: none;
  margin-left: 24px;
  :focus {
    outline: none;
  }
`
export const TagLabel = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.75px;
  color: #ffffff;
`
