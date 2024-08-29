import type React from "react"
import { useState } from "react"
import { Handle, Position } from "@xyflow/react"
import Popover from "@mui/material/Popover"
import Typography from "@mui/material/Typography"
import type { customObject } from "../containers/ClusterViewContainer"

// CREATE TYPE INTERFACE FOR DATA

// ****************************
// **   Create Interface's   **
// ****************************

const CustomNode = ({ data }: customObject) => {
  // ** set local state **
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    // console.log("clicked: ", event.target)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  console.log("CustomNode Line 52: data: ", data)

  return (
    <>
      <div
        style={{ padding: 5, backgroundColor: "#87CEEB", borderRadius: 10 }}
        onClick={handleClick}
      >
        <div>
          {data.name.length > 10 ? `${data.name.slice(0, 20)}...` : data.name}
        </div>
        {/* Handles are used to connect nodes */}
        <Handle
          type="target"
          position={Position.Top}
          style={{ borderRadius: 100, width: 20 }}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ borderRadius: 100, width: 20 }}
        />
      </div>

      {/**** Dyanmically determine what Popover to render with each ReactFlow Node by checking the popOverType property created in the array of Objects passed in to ReactFlow Component  ****/}
      {data.popOverType === "node" && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Typography sx={{ p: 2 }}>
            <strong>Name:</strong> {data.name}
            <br />
            <strong>Time Created:</strong>
            {data["creationTimestamp"] ? data.creationTimestamp : null}
            <br />
            <strong>Capacity:</strong>
            <br />
            <strong>
              <span style={{ marginLeft: "20px" }}> CPU: </span>
            </strong>
            {data.capacity["cpu"].toString()}
            <br />
            <strong>
              <span style={{ marginLeft: "20px" }}> ephemeral-storage: </span>
            </strong>
            {data.capacity["ephemeral-storage"]}
            <br />
            <strong>
              <span style={{ marginLeft: "20px" }}> hugepages-1Gi: </span>
            </strong>
            {data.capacity["hugepages-1Gi"]}
            <br />
            <strong>
              <span style={{ marginLeft: "20px" }}> hugepages-2Mi: </span>
            </strong>
            {data.capacity["hugepages-2Mi"]}
            <br />
            <strong>
              <span style={{ marginLeft: "20px" }}> memory: </span>
            </strong>
            {data.capacity["memory"]}
            <br />
            <strong>
              <span style={{ marginLeft: "20px" }}> pods: </span>
            </strong>
            {data.capacity["pods"]}
          </Typography>
        </Popover>
      )}

      {data.popOverType === "pod" && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Typography sx={{ p: 2 }}>
            <strong>Name:</strong> {data.name}
            <br />
            <strong>Time Created: </strong>
            {data.creationTimestamp ? data.creationTimestamp : null}
            <br />
            <strong>phase:</strong> {data.phase}
            <br />
            <strong>restartPolicy:</strong> {data.restartPolicy}
            <br />
            <strong>uid:</strong> {data.uid}
          </Typography>
        </Popover>
      )}


    </>
  )
}

export default CustomNode
