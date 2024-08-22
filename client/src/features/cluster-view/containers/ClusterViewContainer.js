import { jsx as _jsx } from "react/jsx-runtime";
import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
export default function ClusterViewContainer() {
    // test nodes for React Flow chart
    const testNodes = [
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
    ];
    // test edges for Reat Flow chart
    const testEdges = [
        {
            id: "e1-2",
            source: "1",
            target: "2",
        },
    ];
    return (
    // test chart render for React Flow chart
    _jsx("div", { id: "clusterview-container", className: "container", children: _jsx("div", { style: { width: "100vw", height: "100vh" }, children: _jsx(ReactFlow, { nodes: testNodes, edges: testEdges }) }) }));
}
