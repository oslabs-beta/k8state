import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Grid, Button } from "@mui/material";
import './Row.css'; // Import the CSS file
export default function Row(props) {
    const [appear, setAppear] = useState(false);
    const [log, setLog] = useState([]);
    const [name, setName] = useState([]);
    const [namespace, setNamespace] = useState([]);
    const downloadLogHandler = () => {
        fetch('http://localhost:8080/api/getDownloadLogs/' + props.logName, {
            method: 'GET',
        })
            .then(response => response.blob()) //stores the file in a blob (binary large object)
            .then(blob => {
            const url = window.URL.createObjectURL(//creates a URL with the blob object
            new Blob([blob]));
            const link = document.createElement('a'); //creates an anchor for the download
            link.href = url; //sets the blob's url to the anchor
            link.setAttribute('download', props.logName); //sets download attribute and file name (file type matters)
            document.body.appendChild(link); //appends document to DOM
            link.click(); //"clicks" the button
            if (link.parentNode) {
                link.parentNode.removeChild(link);
            }
            window.URL.revokeObjectURL(url); //cleans up the URL
        });
    };
    const readLogHandler = () => {
        if (appear) {
            setAppear(false);
        }
        else {
            fetch('http://localhost:8080/api/getLogs/' + props.logName, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                console.log(data);
                setName(data.map((element, i) => {
                    return _jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: element.name }, i + 303030303);
                }));
                setNamespace(data.map((element, i) => {
                    return _jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: element.namespace }, i + 101010101);
                }));
                setLog(data.map((element, i) => {
                    return _jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: element.logs }, i + 202020202);
                }));
                setAppear(true);
            })
                .catch(error => {
                console.log(error);
            });
        }
    };
    const deleteLogHandler = () => {
        fetch('http://localhost:8080/api/deleteLogs/' + props.logName, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
            props.setDeleted(data);
            console.log(data);
        })
            .catch(error => {
            console.log(error);
        });
    };
    const dateManager = () => {
        const regex = /(\d{4})-(\d{1,2})-(\d{1,2})-(\d{1,2})-(\d{1,2})-(\d{1,2})/;
        const dateInfo = props.logName.match(regex);
        if (dateInfo) {
            const [_, year, month, day] = dateInfo;
            const date = new Date(`${year}-${month}-${day}`);
        }
    };
    return (_jsxs("div", { className: 'rows', children: [_jsxs("h3", { children: ["Log Name: ", props.logName] }, void 0), _jsxs("h4", { children: ["Created on: ", " "] }, void 0), _jsx(Button, { style: { marginBottom: '16px' }, variant: "contained", color: "primary", type: "button", onClick: readLogHandler, children: "Read" }, void 0), _jsx(Button, { style: { marginBottom: '16px' }, variant: "contained", color: "primary", type: "button", onClick: downloadLogHandler, children: "Download" }, void 0), _jsx(Button, { style: { marginBottom: '16px' }, variant: "contained", color: "primary", type: "button", onClick: deleteLogHandler, children: "Delete" }, void 0), appear === true && (_jsx("div", { className: "popup", children: _jsxs(Grid, { container: true, direction: "row", sx: {}, children: [_jsxs(Grid, { item: true, style: { marginRight: '16px ' }, children: [_jsx("h4", { children: "Node Name" }, void 0), _jsx(Grid, { container: true, direction: "column", spacing: 4, children: name }, void 0)] }, void 0), _jsxs(Grid, { item: true, style: { marginRight: '32px ' }, children: [_jsx("h4", { children: "Namespace" }, void 0), _jsx(Grid, { container: true, direction: "column", spacing: 4, children: namespace }, void 0)] }, void 0), _jsxs(Grid, { item: true, children: [_jsx("h4", { children: "Log" }, void 0), _jsx(Grid, { container: true, direction: "column", spacing: 4, sx: { whiteSpace: 'nowrap', overflow: 'auto', textOverflow: 'ellipsis', maxWidth: '1000px' }, children: log }, void 0)] }, void 0)] }, void 0) }, void 0))] }, void 0));
}
