import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { StudentListTile } from "../student-list-tile/student-list-tile.component"

export default function FilteredStudent({ type }) {
  const students = useSelector((state) => state?.students)

  const [filteredStudents, setFilteredStudents] = useState([])

  useEffect(() => {
    const stuArr = []
    students?.map((s) => {
      if (s.rollMark === type) {
        stuArr.push(s)
      }
    })
    setFilteredStudents(stuArr)
  }, [type])

  if (filteredStudents.length <= 0) {
    return <CenteredContainer>No students to display.</CenteredContainer>
  }

  return (
    <div>
      {filteredStudents?.map((s) => (
        <StudentListTile key={s.id} student={s} />
      ))}
    </div>
  )
}