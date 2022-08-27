import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loading: false,
  results: null,
}

export const studentSearchSlice = createSlice({
  name: "studentSearchResults",
  initialState,
  reducers: {
    setStudentSearchLoading: (state, action) => {
      return { ...state, loading: action?.payload }
    },
    setStudentSearchResults: (state, action) => {
      return { ...state, loading: false, results: action?.payload }
    },
    setSearchResultToDefault: (state, action) => {
      return { loading: false, results: null }
    },
  },
})

export const { setStudentSearchLoading, setStudentSearchResults, setSearchResultToDefault } = studentSearchSlice.actions

export default studentSearchSlice.reducer