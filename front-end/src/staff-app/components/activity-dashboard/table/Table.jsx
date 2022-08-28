import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { color } from "../cards/Cards"

const tableDataObj = {
  rollNo: null,
  first_name: "",
  last_name: "",
  staus: "",
  dateTime: "",
}

export default function Table({ selectedCard, studSummary, apiData, students }) {
  const headers = ["Roll No", "First Name", "Last Name", "Status", "Date/Time"]

  const [tableData, setTableData] = useState(null)

  const extractStudenInfo = (item) => {
    let idIndex = students?.findIndex((s) => {
      return s?.id === item
    })
    if (idIndex !== -1) {
      return { id: students[idIndex]?.id, first_name: students[idIndex]?.first_name, last_name: students[idIndex]?.first_name, status: students[idIndex]?.rollMark }
    }
  }

  const extractStudentActivityDate = (item) => {
    let idIndex = apiData?.activity?.findIndex((i) => i?.entity?.id === item)
    if (idIndex !== -1) {
      return { dateTime: apiData?.activity?.[idIndex]?.entity?.completed_at }
    }
  }

  useEffect(() => {
    const arr = studSummary?.[selectedCard]?.studentIds.map((item) => {
      let a = extractStudenInfo(item)
      let b = extractStudentActivityDate(item)
      console.log(b)
      let obj = { ...a, ...b }
      return obj
    })

    setTableData(arr)
    return () => setTableData(null)
  }, [selectedCard, studSummary, apiData?.activity])

  return (
    <T.StyledTable>
      <T.THeader>
        <tr>
          {headers.map((item) => (
            <th key={item}>{item}</th>
          ))}
        </tr>
      </T.THeader>
      <tbody>
        {tableData?.map((item) => (
          <T.BodyRow>
            <T.TData>{item?.id}</T.TData>
            <T.TData>{item?.first_name}</T.TData>
            <T.TData>{item?.last_name}</T.TData>
            <T.TData>
              <T.Pills status={item?.status}> {item?.status}</T.Pills>
            </T.TData>
              <T.TData>{new Date(item?.dateTime).toUTCString()}</T.TData>
          </T.BodyRow>
        ))}
      </tbody>
    </T.StyledTable>
  )
}

const T = {
  StyledTable: styled.table`
    width: 90%;
    border-collapse: separate;
    border-spacing: 0 1em;
  `,
  THeader: styled.thead`
    color: red;
    background: #343f63;
    height: 50px;
    color: white;
  `,
  TData: styled.td`
    text-align: center;
    margin: 0.5rem;
  `,
  BodyRow: styled.tr`
    margin-bottom: 0.5rem;
    border: 1px solid red;
  `,
  Pills: styled.span`
    background: ${(props) => color[props.status]};
    padding: 0.2rem 0.5rem;
    border-radius: 32px;
    font-weight: 500;
  `,
}