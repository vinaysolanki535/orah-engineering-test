import React, { useEffect, useState } from "react"
import CloseIcon from "@mui/icons-material/Close"
import SearchIcon from "@mui/icons-material/Search"
import "./searchStudent.css"
import { useDispatch, useSelector } from "react-redux"
import { setSearchResultToDefault, setStudentSearchLoading, setStudentSearchResults } from "reducers/searchResults.reducer"

const getFullName = (firstName, lastName) => {
  return `${firstName.toUpperCase()}${lastName.toUpperCase()}`
}

export const SearchStudentInput = ({ toogleInput }) => {
  const [searchKeywords, setSearchKeyWords] = useState("")
  const students = useSelector((state) => state?.students)
  const dispatch = useDispatch()

  const handleInput = (e) => {
    setSearchKeyWords(e.target.value)
  }

  const handleSearchStudent = () => {
    const regex = new RegExp(`^${searchKeywords.toUpperCase()}`)
    const matches = []
    students?.forEach((s) => {
      let queryName = getFullName(s.first_name, s.last_name)
      if (regex.test(queryName)) {
        matches.push(s)
      }
    })
    dispatch(setStudentSearchResults(matches))
    dispatch(setStudentSearchLoading(false))
  }

  useEffect(() => {
    if (searchKeywords) {
      dispatch(setStudentSearchLoading(true))
      handleSearchStudent()
    } else {
      dispatch(setSearchResultToDefault())
    }
  }, [searchKeywords])

  return (
    <div className="input_container">
      <SearchIcon className="searchIcon icon" />
      <input className="input" placeholder="Search Student" value={searchKeywords} onChange={handleInput} autoFocus />
      <CloseIcon
        className="crossIcon"
        onClick={() => {
          toogleInput(false)
          dispatch(setSearchResultToDefault())
        }}
      />
    </div>
  )
}