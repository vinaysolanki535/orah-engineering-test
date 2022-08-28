import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import { useDispatch, useSelector } from "react-redux"
import { setStudentListReducer } from "reducers/studentList.reducer"
import { SearchStudentInput } from "staff-app/components/search-student-overlay/search-student.component"
import LoadingSpinner from "shared/components/loading-spinner"
import FilteredStudent from "staff-app/components/filtered-student-rollType/FilteredStudent"
import SortToggle from "staff-app/components/sort-toggle/SortToggle"

export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)
  const { loading: searchLoading, results: studentMatchesList } = useSelector((state: any) => state?.studentSearch)

  const dispatch = useDispatch()
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })

  const [showFilteredStudentbyRollType, setshowFilteredStudentbyRollType] = useState(false)

  const [rollTypeSelected, setRollTypeSelected] = useState("")

  const students = useSelector((state: any) => state?.students)

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  useEffect(() => {
    if (data) {
      const modifiedList = data?.students?.map((s) => {
        const defaultList = { ...s, rollMark: "unmark" }
        return defaultList
      })
      dispatch(setStudentListReducer(modifiedList))
    }
  }, [data])

  const onToolbarAction = (action: ToolbarAction) => {
    if (action === "roll") {
      setIsRollMode(true)
    }
  }

  const onActiveRollAction = (action: ActiveRollAction, type: any) => {
    if (action === "exit") {
      setIsRollMode(false)
      setshowFilteredStudentbyRollType(false)
      setRollTypeSelected("")
    }
    if (action === "filter") {
      setshowFilteredStudentbyRollType(true)
      setRollTypeSelected(type)
    }
  }

  const canShowSearchResults = () => {
    return !searchLoading && studentMatchesList
  }

  const canShowAllStudentsLists = () => {
    return !studentMatchesList && loadState === "loaded" && data?.students
  }

  return (
    <>
      <S.PageContainer>
      <Toolbar onItemClick={onToolbarAction} activeRollOverlayExit={() => onActiveRollAction("exit", "")} />

        {loadState === "loading" && <LoadingSpinner />}

        {searchLoading && <LoadingSpinner />}

        {showFilteredStudentbyRollType && rollTypeSelected ? (
          <FilteredStudent type={rollTypeSelected} />
        ) : (
         <>
              {canShowSearchResults() && (
                <>
                  {studentMatchesList?.map((s: any) => (
                    <StudentListTile key={s.id} isRollMode={isRollMode} student={s} />
                  ))}
                </>
              )}

              {canShowAllStudentsLists() && (
                <>
                  {students?.map((s : any) => (
                    <StudentListTile key={s.id} isRollMode={isRollMode} student={s} />
                  ))}
                </>
              )}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} />
    </>
  )
}

type ToolbarAction = "roll" | "sort" 
interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void
  activeRollOverlayExit: () => void
}
const Toolbar: React.FC<ToolbarProps> = (props) => {
  const [showSearchInput, setshowSearchInput] = useState<boolean>(false)
  const { onItemClick } = props

  const toogleSearchInput = (state: boolean) => {
    setshowSearchInput((showSearchInput) => state)
    props.activeRollOverlayExit()
  }

  return (
    <S.ToolbarContainer>
      <S.NameContainer style={{}}>
        <S.Name onClick={() => onItemClick("sort")}>
          First Name <SortToggle sortFor={"first_name"} />
        </S.Name>
        <S.Name onClick={() => onItemClick("sort")}>
          Last Name <SortToggle sortFor={"last_name"} />
        </S.Name>
      </S.NameContainer>

      {!showSearchInput ? (
        <div style={{ flex: ".4" }} onClick={() => toogleSearchInput(true)}>
          Search
        </div>
      ) : (
        <SearchStudentInput toogleInput={toogleSearchInput} />
      )}
      <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
    </S.ToolbarContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
  Name: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  NameContainer: styled.div`
    flex: 0.38;
    display: flex;
    flexdirection: row;
  `,
}
