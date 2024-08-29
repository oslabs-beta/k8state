import { useState, useEffect } from "react"
import "@xyflow/react/dist/style.css"
import { ReactFlow, Background, Controls } from "@xyflow/react"
import {
  useGetKubernetesNodesQuery,
  useGetKubernetesPodsQuery,
} from "../clusterViewApiSlice"

import CustomNode from "../components/CustomNode" // Import your custom node

import type { KubernetesNode, KubernetesPod } from "../clusterViewApiSlice"

// ****************************
// **   Create Interface's   **
// ****************************

// **CORRECT THIS INTERFACE. Currently data property is a nested obj and type is set to any. Type MUST be more specific
interface ReactFlowNodeData {
  id: string
  position: { x: number; y: number }
  data: KubernetesNode | KubernetesPod | ClusterObj
  // data: customObject
  type?: Object
  draggable?: boolean
  pods?: KubernetesPod[]
  popOverType?: "node" | "pod"
}

export type customObject = KubernetesNode | KubernetesPod | ClusterObj

interface ReactFlowEdgeFlow {
  id: string
  source: string
  target: string
  animated: boolean
}

interface ClusterObj {
  name: string
}
interface MiddlewareNodes {
  name: string
  data: KubernetesNode
  pods: KubernetesPod[]
}

// *******************
// **   Component   **
// *******************

export default function ClusterViewContainer() {
  // **** Global State ****
  // Hooks into Kubernets Cluster Data via RTK Query
  const {
    data: kubernetesNodes = [],
    error: kubernetesNodesError,
    isLoading: kubernetesNodesIsLoading,
    refetch: refetchKubernetesNodes,
  } = useGetKubernetesNodesQuery()
  const {
    data: kubernetesPods = [],
    error: kubernetsPodsError,
    isLoading: kubernetsPodsIsLoading,
    refetch: refetchKubernetsPods,
  } = useGetKubernetesPodsQuery()

  // **** Local State ****
  // Sets state for nodes array ****
  const [mappedNodes, setMappedNodes] = useState<MiddlewareNodes[]>([])

  // **** Manage Side Effect ****
  // Ensure mappedNodes is always up to date when new data is recieved from Kubernetes Cluster
  useEffect(() => {
    if (kubernetesNodes.length > 0 && kubernetesPods.length > 0) {
      // Creates pod arrays for each node
      const initializedNodes = initializeNodes(kubernetesNodes)
      // Calls node mapping function and stores in a temp variable
      const tempMappedNodes = mapPodsToNodes(initializedNodes, kubernetesPods)
      // Sets the mappedNodes state to the newly mapped nodes
      setMappedNodes(tempMappedNodes)
    }
  }, [kubernetesNodes, kubernetesPods])

  // **** Helper Functions ****
  // mapPodsToNodes, maps the pods array to the corresponding node
  function mapPodsToNodes(
    nodes: MiddlewareNodes[],
    pods: KubernetesPod[],
  ): MiddlewareNodes[] {
    const nodeMap: { [key: string]: MiddlewareNodes } = {}

    nodes.forEach(node => {
      nodeMap[node.name] = node
    })

    pods.forEach(pod => {
      if (nodeMap[pod.nodeName]) {
        nodeMap[pod.nodeName].pods?.push(pod)
      }
    })

    return nodes
  }

  // initializeNodes, adds a 'pods' array to each node in the nodes array
  function initializeNodes(nodes: KubernetesNode[]): MiddlewareNodes[] {
    return nodes.map(node => ({ name: node.name, data: node, pods: [] }))
  }
  // Create object to pass into type property of React Flow Nodes. This enables the usage of a React Component to be the structure of a ReactFlow Node.
  const nodeTypes = {
    customNode: CustomNode,
  }

  // dynamically create React Flow Nodes using reactFlowNodes and reactFlowEdges
  const reactFlowNodes = (): ReactFlowNodeData[] => {
    // Adds Kubernetes Cluster as the first node by default
    const outputArray: ReactFlowNodeData[] = [
      {
        id: "Cluster",
        position: { x: (mappedNodes.length / 2 + 1) * 750, y: 0 },
        data: { name: "Cluster" },
        type: "customNode",
      },
    ]

    // Iterates through the mapped nodes state array
    mappedNodes.forEach((node, index) => {
      // Adds the node to the output array first
      const startingXPos = (index + 1) * 1000
      outputArray.push({
        id: node.name,
        position: { x: startingXPos, y: 200 },
        data: { ...node.data, ...{ popOverType: "node" } },
        type: "customNode", // Specify the custom node type
      })

      const podsPerRow = 3
      let podValueY = 300
      let podCurrentIndex = 0

      // Conditional wrapper to start iteration of pods array for current node
      while (podCurrentIndex < node.pods.length) {
        const startX = startingXPos - 250

        // Iterates through the pods array for this node
        for (
          let i = 0;
          i < podsPerRow && podCurrentIndex < node.pods.length;
          i++
        ) {
          // Adds pod to outputArray
          outputArray.push({
            id: node.pods[podCurrentIndex].uid.toString(),
            position: { x: startX + i * 200, y: podValueY },
            data: { ...node.pods[podCurrentIndex], ...{ popOverType: "pod" } },
            type: "customNode", // Specify the custom node type
          })
          podCurrentIndex++
        }

        // Increments variables for new row
        podValueY += 100
      }
    })
    return outputArray
  }

  // **** dynamically create React Flow Edges ****
  const reactFlowEdges = (): ReactFlowEdgeFlow[] => {
    const outputArray: ReactFlowEdgeFlow[] = []

    // Adds React Flow Edges connections between nodes and the cluster
    mappedNodes.forEach(node => {
      outputArray.push({
        id: `Cluster-${node.name}`,
        source: "Cluster",
        target: `${node.name}`,
        animated: true,
      })
    })

    // Adds React Flow Edges connections between pods and nodes
    kubernetesPods.forEach(pod => {
      outputArray.push({
        id: `${pod.nodeName}-${pod.name}`,
        source: `${pod.nodeName}`,
        target: `${pod.uid}`,
        animated: true,
      })
    })
    // console.log(outputArray)
    return outputArray
  }

  const nodesToRender = reactFlowNodes()
  const edgesToRender = reactFlowEdges()

  // ****  Return  ****
  return (
    <div id="clusterview-container" className="container">
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodesToRender}
          edges={edgesToRender}
          nodeTypes={nodeTypes} // Pass the custom node types here
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  )
}
