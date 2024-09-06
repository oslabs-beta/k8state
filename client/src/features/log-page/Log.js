import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
export default function Log() {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };
    return (_jsx("div", { children: _jsxs(Accordion, { expanded: expanded, onChange: handleExpansion, slots: { transition: Fade }, slotProps: { transition: { timeout: 400 } }, sx: [
                expanded
                    ? {
                        '& .MuiAccordion-region': {
                            height: 'auto',
                        },
                        '& .MuiAccordionDetails-root': {
                            display: 'block',
                        },
                    }
                    : {
                        '& .MuiAccordion-region': {
                            height: 0,
                        },
                        '& .MuiAccordionDetails-root': {
                            display: 'none',
                        },
                    },
            ], children: [_jsx(AccordionSummary, { expandIcon: _jsx(ExpandMoreIcon, {}, void 0), "aria-controls": "panel1-content", id: "panel1-header", children: _jsx(Typography, { children: "Custom transition using Fade" }, void 0) }, void 0), _jsx(AccordionDetails, { children: _jsx(Typography, { children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." }, void 0) }, void 0)] }, void 0) }, void 0));
    Accordion >  * /};
    div >
    ;
    ;
}
