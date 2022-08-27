import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CenteredContainer } from "./centered-container/centered-container.component"

export default function LoadingSpinner() {
  return (
    <CenteredContainer>
      <FontAwesomeIcon icon="spinner" size="2x" spin />
    </CenteredContainer>
  )
}