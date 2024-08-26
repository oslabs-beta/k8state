import * as React from "react"
import { Button, Box } from "@mui/material"
import ClusterViewContainer from "./features/cluster-view/containers/ClusterViewContainer"
import TestButton from "./TestButton"
import MiniDrawer from "./features/mini-drawer/MiniDrawer"

const App = () => {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* Welcome to k8State */}
      {/* </header> */}
      {/* <Button variant="contained">Test Button</Button> */}
      {/* <TestButton /> */}
      <Box>
        <MiniDrawer />
        <ClusterViewContainer />
      </Box>
    </div>
  )
}

export default App
