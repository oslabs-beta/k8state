import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { createSlice } from "@reduxjs/toolkit"

export interface ClusterLog {
  name: string
  log: Log[]
}

export interface Log {
  date: string
  logs: string
  name: string
  namespace: string
}

// Define an API service for the log page
export const clusterLogsApi = createApi({
  reducerPath: "clusterLogsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  endpoints: builder => ({
    getClusterLogs: builder.query<ClusterLog[], void>({
      query: () => "api/getLogs",
    }),
  }),
})

// Auto-generated hooks for the API queries
export const { useGetClusterLogsQuery } = clusterLogsApi

export interface ClusterLogsState {
  logs: string[]
}

const initialState: ClusterLogsState = {
  logs: ["no logs"],
}

export const clusterLogsSlice = createSlice({
  name: "clusterLogs",
  initialState,
  reducers: {},
})

// Selectors for any additional state managed in this slice
export const selectClusterLogs = (state: { clusterLogs: ClusterLogsState }) =>
  state.clusterLogs.logs

export default clusterLogsSlice.reducer
