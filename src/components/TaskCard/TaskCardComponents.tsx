import styled from 'styled-components'

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 24px;
  gap: 16px;
  max-height: 200px;
  background: #2c2f33;
  border-radius: 8px;
`

export const ProjectInfo = styled.div`
  display: flex;
  position: relative;
  max-height: 32px;
  min-width: 100%;
  justify-content: space-between;
  align-items: center;
`
export const TaskName = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  display: flex;
  width: 284px;
  align-items: center;
  letter-spacing: 0.75px;
  color: #ffffff;
`
export const TimeInfo = styled.div`
  display: flex;
  max-height: 32px;
  width: 100%;
  flex-basis: 100%;
  justify-content: space-between;
  align-items: center;
`
export const Points = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  display: flex;
  align-items: center;
  letter-spacing: 0.75px;
  color: #ffffff;
`
export const TagsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`

export const Reactions = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  color: white;
`
export const InteractionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 106px;
  height: 24px;
  justify-content: space-between;
  align-items: center;
`

export const ForkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40px;
  color: white;
`
export const ForkAmount = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.75px;
`

export const CommentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40px;
  color: white;
`
export const CommentAmount = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.75px;
`

export const MutateModal = styled.div`
  display: flex;
  width: 132px;
  position: absolute;
  flex-direction: column;
  gap: 10px;
  top: 2px;
  right: 32px;
  padding: 8px;
  border: 1px solid #94979a;
  background: #393d41;
  box-sizing: border-box;
  border-radius: 8px;
  z-index: 8;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`

export const MutateOption = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  cursor: pointer;
  justify-content: space-space-between;
  height: 32px;
  border-radius: 4px;
  gap: 4px;
  color: white;
  &:hover {
    background: #94979a;
  }
`
export const MutateOptionLabel = styled.label`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.75px;
  line-height: 24px;
  margin-right: 4px;
  cursor: pointer;
`
