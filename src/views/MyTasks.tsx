import styled from 'styled-components'

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  margin-right: 32px;
  flex-basis: 1108px;
  padding-right: 0.8rem;
  align-items: center;
  gap: 16px;
`

const TableHeaders = styled.div`
  display: grid;
  width: 100%;
  height: 56px;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #393d41;
`
const TableHeaderItem1 = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  border-left: 1px solid#393d41;
  grid-column: 1/4;
  align-items: center;
`

const TableHeaderItem2 = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  border-left: 1px solid#393d41;
  grid-column: 4/5;
  align-items: center;
`
const TableHeaderItem3 = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  border-left: 1px solid#393d41;
  grid-column: 5/6;
  align-items: center;
`
const TableHeaderItem4 = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  border-left: 1px solid#393d41;
  grid-column: 6/7;
  align-items: center;
`
const TableHeaderItem5 = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  border-left: 1px solid#393d41;
  grid-column: 7/8;
  align-items: center;
`
const HeaderText = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.75px;
  color: #ffffff;
  margin: 16px;
`

const MyTasks = () => {
  return (
    <TableContainer>
      <TableHeaders>
        <TableHeaderItem1>
          <HeaderText># Task Name</HeaderText>
        </TableHeaderItem1>
        <TableHeaderItem2>
          <HeaderText>Task Tags</HeaderText>
        </TableHeaderItem2>
        <TableHeaderItem3>
          <HeaderText>Estimate</HeaderText>
        </TableHeaderItem3>
        <TableHeaderItem4>
          <HeaderText>Task Assign Name</HeaderText>
        </TableHeaderItem4>
        <TableHeaderItem5>
          <HeaderText>Due Date</HeaderText>
        </TableHeaderItem5>
      </TableHeaders>
    </TableContainer>
  )
}

export default MyTasks
