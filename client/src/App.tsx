import * as React from "react"
import { Box } from "@mui/material"
import ClusterViewContainer from "./features/cluster-view/containers/ClusterViewContainer"
import MiniDrawer from "./features/mini-drawer/MiniDrawer"

const App = () => {
  return (
    <div className="App">
      <Box>
        <MiniDrawer />
      </Box>
    </div>
  )
}

export default App
