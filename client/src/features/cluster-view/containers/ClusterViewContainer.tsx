import { useState, useEffect, useMemo } from "react"
import "@xyflow/react/dist/style.css"
import { ReactFlow, Background, Controls } from "@xyflow/react"
import type { Node, Edge } from "@xyflow/react"
import { MiniMap } from "@xyflow/react"
import {
  useGetKubernetesNodesQuery,
  useGetKubernetesPodsQuery,
} from "../clusterViewApiSlice"
import { KubeNode, KubePod, KubeCluster } from "../components/CustomNode"
import type { KubernetesNode, KubernetesPod } from "../clusterViewApiSlice"

// ****************************
// **   Create Interface's   **
// ****************************

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
    // error: kubernetesNodesError,
    // isLoading: kubernetesNodesIsLoading,
    // refetch: refetchKubernetesNodes,
  } = useGetKubernetesNodesQuery()
  const {
    data: kubernetesPods = [],
    // error: kubernetsPodsError,
    // isLoading: kubernetesPodsIsLoading,
    // refetch: refetchKubernetsPods,
  } = useGetKubernetesPodsQuery()

  // Create object to pass into type property of React Flow Nodes.
  // This enables the usage of a React Component to be the structure of a ReactFlow Node.
  const nodeTypes = useMemo(
    () => ({ kubeNode: KubeNode, kubePod: KubePod, kubeCluster: KubeCluster }),
    [],
  )

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

  // **** Local State ****
  // Sets state for nodes array ****
  const [mappedNodes, setMappedNodes] = useState<MiddlewareNodes[]>([])

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

  // Adds a 'pods' array to each node in the nodes array
  // This array stores the corresponding pods for that node
  function initializeNodes(nodes: KubernetesNode[]): MiddlewareNodes[] {
    return nodes.map(node => ({ name: node.name, data: node, pods: [] }))
  }

  // **********************************
  // **   Renders React Flow Nodes   **
  // **********************************
  const reactFlowNodes = (): Node[] => {
    // Adds Kubernetes Cluster as the first node by default
    const reactFlowNodeArray: Node[] = [
      {
        id: "Cluster",
        position: { x: (mappedNodes.length / 2 + 1) * 750, y: 0 },
        data: { name: "Cluster" },
        type: "kubeCluster",
        draggable: true,
      },
    ]

    // Iterates through the mapped nodes state array
    mappedNodes.forEach((node, index) => {
      // Adds the node to the output array first
      const startingXPos = (index + 1) * 1000
      reactFlowNodeArray.push({
        id: node.name,
        position: { x: startingXPos, y: 300 },
        data: { ...node.data },
        type: "kubeNode",
        draggable: true,
      })

      const podsPerRow = 3
      let podValueY = 600
      let podCurrentIndex = 0

      // Conditional wrapper to start iteration of pods array for current node
      while (podCurrentIndex < node.pods.length) {
        const startX = startingXPos - 200

        // Iterates through the pods array for this node
        for (
          let i = 0;
          i < podsPerRow && podCurrentIndex < node.pods.length;
          i++
        ) {
          // Adds pod to reactFlowNodeArray
          reactFlowNodeArray.push({
            id: node.pods[podCurrentIndex].uid.toString(),
            position: { x: startX + i * 200, y: podValueY },
            data: { ...node.pods[podCurrentIndex] },
            type: "kubePod",
            draggable: true,
          })
          podCurrentIndex++
        }

        // Increments variables for new row
        podValueY += 200
      }
    })
    return reactFlowNodeArray
  }

  // **********************************
  // **   Renders React Flow Edges   **
  // **********************************

  const reactFlowEdges = (): Edge[] => {
    const reactFlowEdgeArray: Edge[] = []

    // Adds React Flow Edges connections between nodes and the cluster
    mappedNodes.forEach(node => {
      reactFlowEdgeArray.push({
        id: `Cluster-${node.name}`,
        source: "Cluster",
        target: `${node.name}`,
        animated: true,
      })
    })

    // Adds React Flow Edges connections between pods and nodes
    kubernetesPods.forEach(pod => {
      reactFlowEdgeArray.push({
        id: `${pod.nodeName}-${pod.name}`,
        source: `${pod.nodeName}`,
        target: `${pod.uid}`,
        animated: true,
      })
    })
    return reactFlowEdgeArray
  }

  const nodes = reactFlowNodes()
  const edges = reactFlowEdges()

  // ****  ClusterViewContainer Function Return  ****
  return (
    <div id="clusterview-container" className="container">
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
          <Background />
          <Controls />
          <MiniMap style={{ backgroundColor: "gray" }} />
        </ReactFlow>
      </div>
    </div>
  )
}
