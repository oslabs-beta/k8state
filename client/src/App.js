import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime"
import "./App.css"
import Button from "@mui/material/Button"
const App = () => {
  return _jsx("div", {
    className: "App",
    children: _jsxs("header", {
      className: "App-header",
      children: [
        "Welcome to k8State",
        _jsx(Button, { variant: "contained", children: "facebook " }),
      ],
    }),
  })
}
export default App
