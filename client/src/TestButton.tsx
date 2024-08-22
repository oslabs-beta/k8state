import type React from "react"
import {
  useGetNodesQuery,
  useGetPodsQuery,
} from "./features/cluster-view/clusterViewApiSlice"
import { useAppSelector } from "./app/hooks"
import { selectPods } from "./features/cluster-view/clusterViewApiSlice"

// interface Node {
//   creationTimestamp: string
//   name: string
//   labels: { [key: string]: string }
//   podCIDR: string
//   addresses: { type: string; address: string }[]
//   allocatable: { [key: string]: string }
//   capacity: { [key: string]: string }
//   conditions: { type: string; status: string }[]
// }

export default function TestButton() {
  // Use RTK Query's generated hook to fetch nodes
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
  // const pods = useAppSelector(selectPods) // Example of using another selector if needed

  // Handle button click to refetch nodes
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log("Test Button Clicked")
    refetchNodes() // Refetch the data manually if needed
  }

  console.log("nodes: ", nodes)
  console.log("Pods: ", pods)
  // console.log("isLoading: ", isLoading)

  return (
    <>
      <button onClick={handleClick}>test button</button>

      {/* Show status messages */}
      {nodesIsLoading && <p>Loading...</p>}
      {nodesError && <p>Error loading nodes</p>}

      {!nodesIsLoading && !nodesError && (
        <>
          <h1>NODES</h1>
          <ul>
            {nodes.map((node, index) => (
              <li key={index}>
                <p>Name: {node.name}</p>
                <p>Pod CIDR: {node.podCIDR}</p>
                <p>
                  Creation Time:{" "}
                  {new Date(node.creationTimestamp).toLocaleString()}
                </p>
                <p>Addresses:</p>
                <ul>
                  {node.addresses.map((address, i) => (
                    <li key={i}>
                      {address.type}: {address.address}
                    </li>
                  ))}
                </ul>
                {/* Render other properties as needed */}
              </li>
            ))}
          </ul>
        </>
      )}
      {!podsIsLoading && !podsError && (
        <>
          <h1>PODS</h1>
          <ul>
            {pods.map((pod, index) => (
              <li key={index}>
                <p>Name: {pod.name}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
