import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
export default function ForgotPassword({ open, handleClose }) {
    return (_jsxs(Dialog, { open: open, onClose: handleClose, PaperProps: {
            component: 'form',
            onSubmit: (event) => {
                event.preventDefault();
                handleClose();
            },
        }, children: [_jsx(DialogTitle, { children: "Reset password" }), _jsxs(DialogContent, { sx: { display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }, children: [_jsx(DialogContentText, { children: "Enter your account's email address, and we'll send you a link to reset your password." }), _jsx(OutlinedInput, { autoFocus: true, required: true, margin: "dense", id: "email", name: "email", label: "Email address", placeholder: "Email address", type: "email", fullWidth: true })] }), _jsxs(DialogActions, { sx: { pb: 3, px: 3 }, children: [_jsx(Button, { onClick: handleClose, children: "Cancel" }), _jsx(Button, { variant: "contained", type: "submit", children: "Continue" })] })] }));
}
