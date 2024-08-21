import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
export default function ClusterViewContainer() {
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
    const testEdges = [
        {
            id: "e1-2",
            source: "1",
            target: "2",
        },
    ];
    return (_jsx(_Fragment, { children: _jsx("div", { style: { width: "100vw", height: "100vh" }, children: _jsx(ReactFlow, { nodes: testNodes, edges: testEdges }) }) }));
}
