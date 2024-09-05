import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@mui/material";
export default function Row(props) {
    const [appear, setAppear] = useState(false);
    const [log, setLog] = useState('');
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
        fetch('http://localhost:8080/api/getLogs/' + props.logName, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
            //console.log(data);
            // for(const element of data){
            //     element.log()
            // }
            setLog(data);
            setAppear(true);
        })
            .catch(error => {
            console.log(error);
        });
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
    return (_jsxs("div", { className: 'rows', children: [_jsxs("div", { className: 'logName', children: ["Log Name: ", props.logName] }), _jsx(Button, { variant: "contained", color: "primary", type: "button", onClick: readLogHandler, children: "read" }), _jsx(Button, { variant: "contained", color: "primary", type: "button", onClick: downloadLogHandler, children: "Download" }), _jsx(Button, { variant: "contained", color: "primary", type: "button", onClick: deleteLogHandler, children: "Delete" }), appear === true && (_jsxs("div", { className: "popup", children: [log, _jsx(Button, { variant: "contained", color: "primary", type: "button", onClick: () => setAppear(false), children: "X" })] })), _jsx("hr", {})] }));
}
