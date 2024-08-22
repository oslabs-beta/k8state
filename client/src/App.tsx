import "./App.css"
import * as React from "react"
import Button from "@mui/material/Button"

import TestButton from "./testbutton"

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        Welcome to k8State
        {/* <Button variant="contained">Test Button</Button> */}
        <TestButton />
      </header>
    </div>
  )
}

export default App
