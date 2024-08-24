import "./App.css"
import * as React from "react"
import { Button, Box } from "@mui/material"
import ClusterViewContainer from "./features/cluster-view/containers/ClusterViewContainer"
import TestButton from "./TestButton"

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        Welcome to k8State
        {/* <Button variant="contained">Test Button</Button> */}
        {/* <TestButton /> */}
        <Box>
          <ClusterViewContainer />
        </Box>
      </header>
    </div>
  )
}

export default App
