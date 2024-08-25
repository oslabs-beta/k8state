import { ReactFlow, Background, Controls } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useGetNodesQuery, useGetPodsQuery } from "../clusterViewApiSlice"

// ****************************
// **   Create Interface's   **
// ****************************

interface ReactFlowEdgeFlow {
  id: string
  source: string
  target: string
}

interface ReactFlowNodeData {
  id: string
  position: { x: number; y: number }
  data: { label: string }
}

// *******************
// **   Component   **
// *******************

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

  // **** dynamically create React Flow Nodes ****
  const reactFlowNodes = (): ReactFlowNodeData[] => {
    const outputArray = []

    // ** Add pods and nodes to an array; React Flow will use this array to build the node tree **
    for (let i = 0; i < nodes.length; i++) {
      const currentNodeData = nodes[i]
      const nodeObj = {
        id: i.toString(),
        position: { x: i * 100, y: i * 100 },
        data: { label: currentNodeData.name },
      }
      outputArray.push(nodeObj)
    }

    for (let i = 0; i < pods.length; i++) {
      const currentPodData = pods[i]
      if (i === 0) {
        const podObj = {
          id: i.toString(),
          position: { x: 50, y: 50 },
          data: { label: currentPodData.name },
        }
      } else {
        const podObj = {
          id: i.toString(),
          position: { x: i * 100 + 100, y: i * 100 + 100 },
          data: { label: currentPodData.name },
        }
        outputArray.push(podObj)
      }
    }
    return outputArray
  }

  // **** dynamically create React Flow Edges ****
  const reactFlowEdges = (
    reactFlowNodes: ReactFloNodeData[],
  ): ReactFlowEdgeFlow[] => {
    const outputArray = []
    let i = 1
    while (i < reactFlowNodes.length) {
      outputArray.push({
        id: `${i - 1}-${i}`,
        source: "0",
        target: `${i}`,
        animated: true,
      })
      i++
    }
    return outputArray
  }

  const nodesToRender = reactFlowNodes()
  const edgesToRender = reactFlowEdges(nodesToRender)

  // ****  Return  ****
  return (
    // test chart render for React Flow chart
    <div id="clusterview-container" className="container">
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow nodes={nodesToRender} edges={edgesToRender} fitView>
          <Background />
          <Controls />
          {/* <MiniMap /> */}
        </ReactFlow>
      </div>
    </div>
  )
}
