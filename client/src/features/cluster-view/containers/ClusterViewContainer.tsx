import React from "react"
import { ReactFlow } from "@xyflow/react"
import "@xyflow/react/dist/style.css"

interface NodeFlow {
  id: string
  position: { x: number; y: number }
  data: { label: string }
}

// interface NodeFlowCollection {
//   [key: string]: NodeFlow;
// }

interface EdgeFlow {
  id: string
  source: string
  target: string
}

export default function ClusterViewContainer() {
  const testNodes: NodeFlow[] = [
    {
      id: "1",
      position: { x: 0, y: 0 },
      data: { label: "1" },
    },
    {
      id: "2",
      position: { x: 0, y: 100 },
      data: { label: "2" },
    },
  ]

  const testEdges: EdgeFlow[] = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
    },
  ]

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow nodes={testNodes} edges={testEdges} />
      </div>
    </>
  )
}
