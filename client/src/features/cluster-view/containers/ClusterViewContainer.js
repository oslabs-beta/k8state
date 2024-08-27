import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useGetNodesQuery, useGetPodsQuery } from "../clusterViewApiSlice";
import { useState, useEffect } from 'react';
// *******************
// **   Component   **
// *******************
export default function ClusterViewContainer() {
    // ** Hook into state **
    const { data: nodes = [], error: nodesError, isLoading: nodesIsLoading, refetch: refetchNodes, } = useGetNodesQuery();
    const { data: pods = [], error: podsError, isLoading: podsIsLoading, refetch: refetchPods, } = useGetPodsQuery();
    // Creates local state for nodes array
    const [mappedNodes, setMappedNodes] = useState([]);
    // This function maps the pods array to the corresponding node
    function mapPodsToNodes(nodes, pods) {
        const nodeMap = {};
        nodes.forEach((node) => {
            nodeMap[node.name] = { ...node, pods: [] };
        });
        pods.forEach((pod) => {
            if (nodeMap[pod.nodeName]) {
                nodeMap[pod.nodeName].pods?.push(pod);
            }
        });
        return Object.values(nodeMap);
    }
    // This is a helper function that adds a 'pods' array to each node in the nodes array
    function initializeNodes(rawNodes) {
        return rawNodes.map((node) => ({ ...node, pods: [] }));
    }
    // This calls the mapPodsToNodes function defined earlier on render
    useEffect(() => {
        if (nodes.length > 0 && pods.length > 0) {
            // Creates pod arrays for each node
            const initializedNodes = initializeNodes(nodes);
            // Calls node mapping function and stores in a temp variable
            const tempMappedNodes = mapPodsToNodes(initializedNodes, pods);
            // Sets the mappedNodes state to the newly mapped nodes
            setMappedNodes(tempMappedNodes);
        }
    }, [nodes, pods]);
    // **** dynamically create React Flow Nodes ****
    const reactFlowNodes = () => {
        // Adds Kubernetes Cluster as the first node by default
        const outputArray = [{
                id: "Cluster",
                position: { x: ((mappedNodes.length / 2) + 1) * 400, y: 0 },
                data: { label: "Cluster" },
            }];
        // Iterates through the mapped nodes state array
        mappedNodes.forEach((node, index) => {
            // Adds the node to the output array first
            outputArray.push({
                id: node.name,
                position: { x: ((index + 1) * 300), y: 200 },
                data: { label: node.name },
            });
            // Helper variables for pod array iteration
            let podsPerRow = 3;
            let podValueY = 300;
            let podCurrentIndex = 0;
            // Conditional wrapper to start iteration of pods array for current node
            while (podCurrentIndex < node.pods.length) {
                const rowWidth = (podsPerRow - 1) * 200;
                const startX = (index + 1) * 300 - rowWidth / 2;
                // Iterates through the pods array for this node 
                for (let i = 0; i < podsPerRow && podCurrentIndex < node.pods.length; i++) {
                    // Adds pod to outputArray
                    outputArray.push({
                        id: node.pods[podCurrentIndex].uid,
                        position: { x: startX + (i * 200), y: podValueY },
                        data: { label: node.pods[podCurrentIndex].name },
                    });
                    podCurrentIndex++;
                }
                // Increments variables for new row
                podValueY += 100;
                podsPerRow += 2;
            }
        });
        return outputArray;
    };
    // **** dynamically create React Flow Edges ****
    const reactFlowEdges = () => {
        const outputArray = [];
        // Adds React Flow Edges connections between nodes and the cluster
        mappedNodes.forEach((node) => {
            outputArray.push({
                id: `Cluster-${node.name}`,
                source: 'Cluster',
                target: `${node.name}`,
                animated: true,
            });
        });
        // Adds React Flow Edges connections between pods and nodes
        pods.forEach((pod) => {
            outputArray.push({
                id: `${pod.nodeName}-${pod.name}`,
                source: `${pod.nodeName}`,
                target: `${pod.uid}`,
                animated: true,
            });
        });
        return outputArray;
    };
    const nodesToRender = reactFlowNodes();
    const edgesToRender = reactFlowEdges();
    // ****  Return  ****
    return (
    // test chart render for React Flow chart
    _jsx("div", { id: "clusterview-container", className: "container", children: _jsx("div", { style: { width: "100vw", height: "100vh" }, children: _jsxs(ReactFlow, { nodes: nodesToRender, edges: edgesToRender, fitView: true, children: [_jsx(Background, {}), _jsx(Controls, {})] }) }) }));
}
