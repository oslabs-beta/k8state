import type React from "react"
import { useState, useEffect } from "react"
import { Handle, Position } from "@xyflow/react"
import Popover from "@mui/material/Popover"
import Typography from "@mui/material/Typography"
import styled from "styled-components"
import type { KubernetesNode, KubernetesPod } from "../clusterViewApiSlice"
// import shadows from "@mui/material/styles/shadows"

// ****************************
// **   Create Interface's   **
// ****************************

interface ReactFlowNodeData {
  data: KubernetesNode
}

interface ReactFlowPodData {
  data: KubernetesPod
}

interface ReactFlowClusterData {
  data: { name: string }
}

const Cluster = styled.div`
  background: white;
  border-radius: 50%;
  height: 150px;
  width: 150px;
  border: 5px solid #ad97d0;
  box-shadow: 0 0 40px #ad97d0;
  color: black;
  text-align: center;
  align-content: center;
`

const Node = styled.div`
  background: white;
  border-radius: 50%;
  height: 150px;
  width: 150px;
  border: 5px solid #ad97d0;
  box-shadow: 0 0 40px #ad97d0;
  color: black;
  text-align: center;
  align-content: center;
`

const Pod = styled.div`
  background: white;
  border-radius: 50%;
  height: 150px;
  width: 150px;
  color: black;
  text-align: center;
  align-content: center;
`

export const KubeNode = ({ data }: ReactFlowNodeData) => {
  // ** set local state **
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)

  // Define fuctions to open and close popover element
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  return (
    <>
      <Node onClick={handleClick}>
        <div>
          {data.name.length > 10 ? `${data.name.slice(0, 20)}...` : data.name}
        </div>

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
      </Node>

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
    </>
  )
}

export const KubePod = ({ data }: ReactFlowPodData) => {
  // ** set local state **
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const [status, setStatus] = useState(data.conditions[2].status)

  // Monitors changes in pod status and updates state accordingly
  useEffect(() => {
    setStatus(data.conditions[2].status)
  }, [data.conditions])

  // Define fuctions to open and close popover element
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  const styles = {
    border: `5px solid ${status ? "rgb(46, 226, 88)" : "red"}`,
    boxShadow: `0 0 40px ${status ? "rgb(46, 226, 88)" : "red"}`,
  }

  return (
    <>
      <Pod onClick={handleClick} style={styles}>
        <div>
          {data.name.length > 10 ? `${data.name.slice(0, 20)}...` : data.name}
        </div>

        <Handle
          type="target"
          position={Position.Top}
          style={{ borderRadius: 100, width: 20 }}
        />
      </Pod>
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
    </>
  )
}

export const KubeCluster = ({ data }: ReactFlowClusterData) => {
  return (
    <>
      <Cluster>
        <div>
          {data.name.length > 10 ? `${data.name.slice(0, 20)}...` : data.name}
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ borderRadius: 100, width: 20 }}
        />
      </Cluster>
    </>
  )
}
