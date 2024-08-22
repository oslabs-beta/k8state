import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetNodesQuery, useGetPodsQuery, } from "./features/cluster-view/clusterViewApiSlice";
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
    const { data: nodes = [], error: nodesError, isLoading: nodesIsLoading, refetch: refetchNodes, } = useGetNodesQuery();
    const { data: pods = [], error: podsError, isLoading: podsIsLoading, refetch: refetchPods, } = useGetPodsQuery();
    // const pods = useAppSelector(selectPods) // Example of using another selector if needed
    // Handle button click to refetch nodes
    const handleClick = (event) => {
        event.preventDefault();
        console.log("Test Button Clicked");
        refetchNodes(); // Refetch the data manually if needed
    };
    console.log("nodes: ", nodes);
    console.log("Pods: ", pods);
    // console.log("isLoading: ", isLoading)
    return (_jsxs(_Fragment, { children: [_jsx("button", { onClick: handleClick, children: "test button" }), nodesIsLoading && _jsx("p", { children: "Loading..." }), nodesError && _jsx("p", { children: "Error loading nodes" }), !nodesIsLoading && !nodesError && (_jsxs(_Fragment, { children: [_jsx("h1", { children: "NODES" }), _jsx("ul", { children: nodes.map((node, index) => (_jsxs("li", { children: [_jsxs("p", { children: ["Name: ", node.name] }), _jsxs("p", { children: ["Pod CIDR: ", node.podCIDR] }), _jsxs("p", { children: ["Creation Time:", " ", new Date(node.creationTimestamp).toLocaleString()] }), _jsx("p", { children: "Addresses:" }), _jsx("ul", { children: node.addresses.map((address, i) => (_jsxs("li", { children: [address.type, ": ", address.address] }, i))) })] }, index))) })] })), !podsIsLoading && !podsError && (_jsxs(_Fragment, { children: [_jsx("h1", { children: "PODS" }), _jsx("ul", { children: pods.map((pod, index) => (_jsx("li", { children: _jsxs("p", { children: ["Name: ", pod.name] }) }, index))) })] }))] }));
}
