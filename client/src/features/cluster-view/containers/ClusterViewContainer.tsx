import React from "react"
import { ReactFlow, Background, MiniMap, Controls } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useGetNodesQuery, useGetPodsQuery } from "../clusterViewApiSlice"

// ************************
// ** Create Interface's **
// ************************

interface NodeFlow {
  id: string
  position: { x: number; y: number }
  data: { label: string }
}

interface ReactFlowEdgeFlow {
  id: string
  source: string
  target: string
}

interface ReactFloNodeData {
  id: string
  position: { x: number; y: number }
  data: { label: string }
}

// ***************
// ** Component **
// ***************

export default function ClusterViewContainer() {
  // ** Hook into state
  const {
    data: nodes = [],
    error: nodesError,
    isLoading: nodesIsLoading,
    refetch: refetchNodes,
  } = useGetNodesQuery()
  const {
    data: pods = [],
    error: podsError,
    isLoading: podsIsLoading,
    refetch: refetchPods,
  } = useGetPodsQuery()

  const reactFlowNodes: ReactFloNodeData[] = []

  // ** Add pods and nodes to an array; React Flow will use this array to build the node tree **
  for (let i = 0; i < nodes.length; i++) {
    const currentNodeData = nodes[i]
    const nodeObj = {
      id: i.toString(),
      position: { x: i * 100, y: i * 100 },
      data: { label: currentNodeData.name },
    }
    reactFlowNodes.push(nodeObj)
  }

  for (let i = 0; i < pods.length; i++) {
    const currentPodData = pods[i]
    const podObj = {
      id: i.toString(),
      position: { x: i * 100, y: i * 100 },
      data: { label: currentPodData.name },
    }
    reactFlowNodes.push(podObj)
  }

  // MUST BE DYNAMICALLY RENDERED
  const reactFlowEdges: ReactFlowEdgeFlow[] = [
    { id: "0-1", source: "0", target: "1", animated: true },
    { id: "0-2", source: "0", target: "2", animated: true },
    { id: "0-3", source: "0", target: "3", animated: true },
    { id: "0-4", source: "0", target: "4", animated: true },
    { id: "0-5", source: "0", target: "5", animated: true },
    { id: "0-6", source: "0", target: "6", animated: true },
  ]

  return (
    // test chart render for React Flow chart
    <div id="clusterview-container" className="container">
      <div style={{ width: "80vw", height: "60vh" }}>
        <ReactFlow nodes={reactFlowNodes} edges={reactFlowEdges} fitView>
          <Background />
          <Controls />
          {/* <MiniMap /> */}
        </ReactFlow>
      </div>
    </div>
  )
}
