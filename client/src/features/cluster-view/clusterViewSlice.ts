import type { PayloadAction } from "@reduxjs/toolkit"
import type { AppThunk } from "../../app/store"
import { createAppSlice } from "../../app/createAppSlice"

// create an interface
export interface ClusterViewState {
  nodes: string[]
  pods: string[]
  status: "idle" | "loading" | "failed"
}

const initialState: ClusterViewState = {
  nodes: ["node_1"],
  pods: ["pod_1"],
  status: "idle",
}

export const clusterViewSlice = createAppSlice({
  name: "clusterView",
  initialState,

  reducers: create => ({
    generateNodesAsync: create.asyncThunk(
      async () => {
        try {
          const response = await fetch("http://localhost:8080/api/nodes")
          const data = (await response).json()
          return data
        } catch (error) {
          return error
        }
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.nodes = action.payload
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),

  selectors: {
    selectNodes: clusterView => clusterView.nodes,
    selectPods: clusterView => clusterView.pods,
    selectStatus: clusterView => clusterView.status,
  },
})

// Action creators are generated for each case reducer function.
export const { generateNodesAsync } = clusterViewSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectNodes, selectPods, selectStatus } =
  clusterViewSlice.selectors
