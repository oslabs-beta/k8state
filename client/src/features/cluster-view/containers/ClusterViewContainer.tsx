import React from "react"
import { ReactFlow } from "@xyflow/react"
import "@xyflow/react/dist/style.css"

// test interfaces for React Flow chart data
interface NodeFlow {
  id: string
  position: { x: number; y: number }
  data: { label: string }
}

interface EdgeFlow {
  id: string
  source: string
  target: string
}

export default function ClusterViewContainer() {
  // test nodes for React Flow chart
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

  // test edges for Reat Flow chart
  const testEdges: EdgeFlow[] = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
    },
  ]

  return (
    // test chart render for React Flow chart
    <div id="clusterview-container" className="container">
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow nodes={testNodes} edges={testEdges} />
      </div>
    </div>
  )
}
