import type React from "react"
import { ReactEventHandler, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "./app/hooks"
import {
  generateNodesAsync,
  selectNodes,
  selectStatus,
} from "./features/cluster-view/clusterViewSlice"

export default function TestButton() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)
  const nodes = useAppSelector(selectNodes)

  // Dispatch the async action to fetch nodes

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log("Test Button CLicked")

    // Dispatch the async action to fetch nodes
    dispatch(generateNodesAsync())
  }

  console.log(nodes)

  return (
    <>
      <button onClick={handleClick}>test button</button>
    </>
  )
}
