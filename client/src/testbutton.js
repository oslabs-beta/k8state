import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { generateNodesAsync, selectNodes, selectStatus, } from "./features/cluster-view/clusterViewSlice";
export default function TestButton() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const nodes = useAppSelector(selectNodes);
    // Dispatch the async action to fetch nodes
    const handleClick = (event) => {
        event.preventDefault();
        console.log("Test Button CLicked");
        // Dispatch the async action to fetch nodes
        dispatch(generateNodesAsync());
    };
    console.log(nodes);
    return (_jsx(_Fragment, { children: _jsx("button", { onClick: handleClick, children: "test button" }) }));
}
