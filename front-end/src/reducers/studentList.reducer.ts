import { createSlice } from "@reduxjs/toolkit"

const initialState: Array<any> = []

export const studentListSlice = createSlice({
  name: "studentListReducer",
  initialState,
  reducers: {
    setStudentListReducer: (state, action) => {
      return [...action.payload]
    },
  },
})

export const { setStudentListReducer } = studentListSlice.actions

export default studentListSlice.reducer