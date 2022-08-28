import React from "react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/Button"
import { BorderRadius, Spacing } from "shared/styles/styles"
import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component"
import { useSelector } from "react-redux"
import { useApi } from "shared/hooks/use-api"
import { useNavigate } from "react-router-dom"

export type ActiveRollAction = "filter" | "exit"
interface Props {
  isActive: boolean
  onItemClick: (action: ActiveRollAction, value?: string) => void
}

export const ActiveRollOverlay: React.FC<Props> = (props) => {
  const { isActive, onItemClick } = props
  const navigate = useNavigate()
  const [callApi, data, loadState] = useApi({ url: "save-roll" })
  const students = useSelector((state: any) => state?.students)
  const [classSummary, setClassSummary] = useState<any>({ totalStudent: 0, present: 0, late: 0, absent: 0 })

  const giveCount = (type: string) => {
    let count = 0
    students?.forEach((s: any) => {
      if (s?.rollMark === type) {
        count += 1
      }
    })
    return count
  }

  useEffect(() => {
    if (students) {
      setClassSummary({
        totalStudent: students?.length,
        present: giveCount("present"),
        late: giveCount("late"),
        absent: giveCount("absent"),
      })
    }
  }, [students])

  const onRollIconClick = (type: string) => {
    onItemClick("filter", type)
  }

  const handleComplete = async () => {
    let arr = students.map((s: any) => {
      return { student_id: s.id, roll_state: s.rollMark }
    })
    await callApi(arr)
    navigate("/staff/activity")
  }

  return (
    <S.Overlay isActive={isActive}>
      <S.Content>
        <div>Class Attendance</div>
        <div>
          <RollStateList
            stateList={[
              { type: "all", count: classSummary.totalStudent || 0 },
              { type: "present", count: classSummary.present || 0 },
              { type: "late", count: classSummary?.late || 0 },
              { type: "absent", count: classSummary?.absent || 0 },
            ]}
            onItemClick={onRollIconClick}
          />
          <div style={{ marginTop: Spacing.u6 }}>
            <Button color="inherit" onClick={() => onItemClick("exit")}>
              Exit
            </Button>
            <Button color="inherit" style={{ marginLeft: Spacing.u2 }} onClick={handleComplete}>
              Complete
            </Button>
          </div>
        </div>
      </S.Content>
    </S.Overlay>
  )
}

const S = {
  Overlay: styled.div<{ isActive: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    height: ${({ isActive }) => (isActive ? "120px" : 0)};
    width: 100%;
    background-color: rgba(34, 43, 74, 0.92);
    backdrop-filter: blur(2px);
    color: #fff;
  `,
  Content: styled.div`
    display: flex;
    justify-content: space-between;
    width: 52%;
    height: 100px;
    margin: ${Spacing.u3} auto 0;
    border: 1px solid #f5f5f536;
    border-radius: ${BorderRadius.default};
    padding: ${Spacing.u4};
  `,
}
