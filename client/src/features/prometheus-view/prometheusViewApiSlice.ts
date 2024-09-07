import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

// Create types
export interface PrometheusCpuUsage {
  lastHeartbeatTime: Date
  lastTransitionTime: Date
  message: string
  reason: string
  status: string
  type: string
}

export interface PrometheusMemoryUsage {
  metric: { pod?: string | undefined}
  value: [string, string]
}

// Define API service for the grafana ciew
export const prometheusApi = createApi({
  reducerPath: "prometheusApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/"}),
  endpoints: builder => ({
    getPrometheusCpuUsage: builder.query<PrometheusCpuUsage[], void>({
      query: () => 'prom/metrics/cpu'
    }),
    getPrometheusMemoryUsage: builder.query<PrometheusMemoryUsage[], void>({
      query: () => 'prom/metrics/memory',
    }),
  }),
})

// Auto-generated hooks for the API queries
export const {
  useGetPrometheusCpuUsageQuery,
  useGetPrometheusMemoryUsageQuery,
} = prometheusApi;

export interface PrometheusViewState {
  pods: string[]
}

const initialState: PrometheusViewState = {
  pods: ["initial_data"],
}

export const prometheusViewSlice = createSlice({
  name: "prometheusView",
  initialState,
  reducers: {
    // Define any additional reducers here if needed
  },
})

// Selectors for any additional state managed in this slice
export const prometheusData = (state: { prometheusView: PrometheusViewState }) =>
  state.prometheusView.pods

export default prometheusViewSlice.reducer