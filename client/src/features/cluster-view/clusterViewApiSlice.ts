import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { createSlice } from "@reduxjs/toolkit"

// Define the structure of the Node object
export interface KubernetesNode {
  creationTimestamp: string
  name: string
  labels: { [key: string]: string }
  podCIDR: string
  addresses: { type: string; address: string }[]
  allocatable: { [key: string]: string }
  capacity: {
    [key: string]: string
  }
  conditions: { type: string; status: string }[]
}

export interface KubernetesPod {
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
  uid: string
  conditions: Conditions[]
}

export interface KubernetesServices {
  name: String
  namespace: String
  labels: { [key: string]: string } | undefined
  creationTimestamp: Date | undefined
  clusterIP: String | undefined
  ports: string[] | undefined
  selector: { [key: string]: string } | undefined
  type: String | undefined
}

interface Conditions {
  lastProbeTime: string | null
  lastTransitionTime: Date
  status: Boolean
  type: string
}

// Define an API service for the cluster view
export const clusterApi = createApi({
  reducerPath: "clusterApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  endpoints: builder => ({
    getKubernetesNodes: builder.query<KubernetesNode[], void>({
      query: () => "api/nodes",
    }),
    getKubernetesPods: builder.query<KubernetesPod[], void>({
      query: () => "api/pods",
    }),
    getKubernetesServices: builder.query<KubernetesServices[], void>({
      query: () => "api/services",
    }),
  }),
})

// Auto-generated hooks for the API queries
export const {
  useGetKubernetesNodesQuery,
  useGetKubernetesPodsQuery,
  useGetKubernetesServicesQuery,
} = clusterApi;

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
