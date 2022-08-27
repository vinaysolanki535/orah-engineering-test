import { combineReducers, configureStore } from "@reduxjs/toolkit"

import studentListReducer from "reducers/studentList.reducer"
import studentSearchResults from "reducers/searchResults.reducer"

const reducer = combineReducers({
  students: studentListReducer,
  studentSearch: studentSearchResults,
})

export const store = configureStore({ reducer })