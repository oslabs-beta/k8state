import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";
// Define API service for the grafana ciew
export const prometheusApi = createApi({
    reducerPath: "prometheusApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
    endpoints: builder => ({
        getPrometheusCpuUsage: builder.query({
            query: () => 'prom/metrics/cpu'
        }),
        getPrometheusMemoryUsage: builder.query({
            query: () => 'prom/metrics/memory',
        }),
    }),
});
// Auto-generated hooks for the API queries
export const { useGetPrometheusCpuUsageQuery, useGetPrometheusMemoryUsageQuery, } = prometheusApi;
const initialState = {
    pods: ["initial_data"],
};
export const prometheusViewSlice = createSlice({
    name: "prometheusView",
    initialState,
    reducers: {
    // Define any additional reducers here if needed
    },
});
// Selectors for any additional state managed in this slice
export const prometheusData = (state) => state.prometheusView.pods;
export default prometheusViewSlice.reducer;
