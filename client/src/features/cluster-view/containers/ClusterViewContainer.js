import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useGetNodesQuery, useGetPodsQuery } from "../clusterViewApiSlice";
// ***************
// ** Component **
// ***************
export default function ClusterViewContainer() {
    // ** Hook into state
    const { data: nodes = [], error: nodesError, isLoading: nodesIsLoading, refetch: refetchNodes, } = useGetNodesQuery();
    const { data: pods = [], error: podsError, isLoading: podsIsLoading, refetch: refetchPods, } = useGetPodsQuery();
    const reactFlowNodes = [];
    // ** Add pods and nodes to an array; React Flow will use this array to build the node tree **
    for (let i = 0; i < nodes.length; i++) {
        const currentNodeData = nodes[i];
        const nodeObj = {
            id: i.toString(),
            position: { x: i * 100, y: i * 100 },
            data: { label: currentNodeData.name },
        };
        reactFlowNodes.push(nodeObj);
    }
    for (let i = 0; i < pods.length; i++) {
        const currentPodData = pods[i];
        const podObj = {
            id: i.toString(),
            position: { x: i * 100, y: i * 100 },
            data: { label: currentPodData.name },
        };
        reactFlowNodes.push(podObj);
    }
    // MUST BE DYNAMICALLY RENDERED
    const reactFlowEdges = [
        { id: "0-1", source: "0", target: "1", animated: true },
        { id: "0-2", source: "0", target: "2", animated: true },
        { id: "0-3", source: "0", target: "3", animated: true },
        { id: "0-4", source: "0", target: "4", animated: true },
        { id: "0-5", source: "0", target: "5", animated: true },
        { id: "0-6", source: "0", target: "6", animated: true },
    ];
    return (
    // test chart render for React Flow chart
    _jsx("div", { id: "clusterview-container", className: "container", children: _jsx("div", { style: { width: "100vw", height: "100vh" }, children: _jsxs(ReactFlow, { nodes: reactFlowNodes, edges: reactFlowEdges, fitView: true, children: [_jsx(Background, {}), _jsx(Controls, {})] }) }) }));
}
