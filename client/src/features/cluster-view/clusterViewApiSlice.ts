import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { createSlice } from "@reduxjs/toolkit"

// Define the structure of the Node object
export interface Node {
  creationTimestamp: string
  name: string
  labels: { [key: string]: string }
  podCIDR: string
  addresses: { type: string; address: string }[]
  allocatable: { [key: string]: string }
  capacity: { [key: string]: string }
  conditions: { type: string; status: string }[]
}

export interface Pod {
  name: string
  creationTimestamp: string
  namespace: string
  labels: { [key: string]: string }
  nodeName: string
  restartPolicy: string
  hostIP: string
  podIP: string
  phase: string
  startTime: string
}

export interface Services {
  name: String
  namespace: String
  labels: { [key: string]: string } | undefined
  creationTimestamp: Date | undefined
  clusterIP: String | undefined
  ports: string[] | undefined
  selector: { [key: string]: string } | undefined
  type: String | undefined
}

// Define an API service for the cluster view
export const clusterApi = createApi({
  reducerPath: "clusterApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
  endpoints: builder => ({
    getNodes: builder.query<Node[], void>({
      query: () => "nodes",
    }),
    getPods: builder.query<Pod[], void>({
      query: () => "pods",
    }),
    getServices: builder.query<Services[], void>({
      query: () => "services",
    }),
  }),
})

// Auto-generated hooks for the API queries
export const { useGetNodesQuery, useGetPodsQuery, useGetServicesQuery } =
  clusterApi

export interface ClusterViewState {
  pods: string[]
}

const initialState: ClusterViewState = {
  pods: ["pod_1"],
}

export const clusterViewSlice = createSlice({
  name: "clusterView",
  initialState,
  reducers: {
    // Define any additional reducers here if needed
  },
})

// Selectors for any additional state managed in this slice
export const selectPods = (state: { clusterView: ClusterViewState }) =>
  state.clusterView.pods

export default clusterViewSlice.reducer
