import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useGetNodesQuery, useGetPodsQuery } from "../clusterViewApiSlice";
// interface Cluster {
//   cluster: Nodes[]
// }
// interface Nodes {
//   name: string;
//   pods: Pods[];
// }
// interface Pods {
//   uid: string;
//   name: string;
//   nodeName: string;
// }
// *******************
// **   Component   **
// *******************
export default function ClusterViewContainer() {
    // ** Hook into state
    const { data: nodes = [], error: nodesError, isLoading: nodesIsLoading, refetch: refetchNodes, } = useGetNodesQuery();
    const { data: pods = [], error: podsError, isLoading: podsIsLoading, refetch: refetchPods, } = useGetPodsQuery();
    // function mapPodsToNodes(nodes: Node[], pods: Pods[]): Nodes[] {
    //   const nodeMap: { [key: string]: Nodes } = {};
    //   nodes.forEach(node => {
    //     nodeMap[node.nodeName] = { ...node, pods: [] };
    //   });
    //   pods.forEach(pod => {
    //     if (nodeMap[pod.nodeName]) {
    //       nodeMap[pod.nodeName].pods?.push(pod);
    //     }
    //   });
    //   return Object.values(nodeMap);
    // }
    // **** dynamically create React Flow Nodes ****
    const reactFlowNodes = () => {
        // const clusterContainer = mapPodsToNodes(nodes, pods);
        // The resulting React Flow Nodes array with Cluster as the first node
        const outputArray = [{
                id: 'Cluster',
                position: { x: ((nodes.length / 2) + 1) * 400, y: 0 },
                data: { label: 'Cluster' }
            }];
        // Adds nodes as nodes in the Array that React Flow will render
        for (let i = 0; i < nodes.length; i++) {
            outputArray.push({
                id: nodes[i].name,
                position: { x: ((i + 1) * 300), y: 200 },
                data: { label: nodes[i].name },
            });
        }
        const addPodsToReactFlowNodes = () => {
            let increment = 3;
            let podsPlaced = 0;
            let row = 0;
            const podSpacingX = 300;
            const podSpacingY = 200;
            while (podsPlaced < pods.length) {
                const width = (increment - 1) * podSpacingX;
                const startX = (width / 2) * -1;
                for (let i = 0; i < increment && podsPlaced < pods.length; i++) {
                    outputArray.push({
                        id: pods[podsPlaced].uid,
                        position: { x: startX + (i * podSpacingX), y: (row * podSpacingY) + 500 },
                        data: { label: pods[podsPlaced].name }
                    });
                    podsPlaced++;
                }
                increment += 2;
                row++;
            }
        };
        addPodsToReactFlowNodes();
        // // Adds pods as nodes in the Array that React Flow will render
        // for (let i = 0; i < pods.length; i++) {
        //   outputArray.push({
        //     id: pods[i].uid,
        //     position: { x: (i * 200) + (i * 100), y: 400 },
        //     data: { label: pods[i].name}
        //   });
        // }
        return outputArray;
    };
    // **** dynamically create React Flow Edges ****
    const reactFlowEdges = () => {
        const outputArray = [];
        // Adds React Flow Edges connections between nodes and the cluster
        for (let i = 0; i < nodes.length; i++) {
            outputArray.push({
                id: `Cluster-${nodes[i].name}`,
                source: 'Cluster',
                target: `${nodes[i].name}`,
                animated: true,
            });
        }
        ;
        // Adds React Flow Edges connections between pods and nodes
        for (let i = 0; i < pods.length; i++) {
            outputArray.push({
                id: `${pods[i].nodeName}-${pods[i].name}`,
                source: `${pods[i].nodeName}`,
                target: `${pods[i].uid}`,
                animated: true,
            });
        }
        return outputArray;
    };
    const nodesToRender = reactFlowNodes();
    const edgesToRender = reactFlowEdges();
    // ****  Return  ****
    return (
    // test chart render for React Flow chart
    _jsx("div", { id: "clusterview-container", className: "container", children: _jsx("div", { style: { width: "100vw", height: "100vh" }, children: _jsxs(ReactFlow, { nodes: nodesToRender, edges: edgesToRender, fitView: true, children: [_jsx(Background, {}), _jsx(Controls, {})] }) }) }));
}
