import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";
// Define an API service for the cluster view
export const clusterApi = createApi({
    reducerPath: "clusterApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
    endpoints: builder => ({
        getNodes: builder.query({
            query: () => "nodes",
        }),
        getPods: builder.query({
            query: () => "pods",
        }),
        getServices: builder.query({
            query: () => "services",
        }),
    }),
});
// Auto-generated hooks for the API queries
export const { useGetNodesQuery, useGetPodsQuery, useGetServicesQuery } = clusterApi;
const initialState = {
    pods: ["pod_1"],
};
export const clusterViewSlice = createSlice({
    name: "clusterView",
    initialState,
    reducers: {
    // Define any additional reducers here if needed
    },
});
// Selectors for any additional state managed in this slice
export const selectPods = (state) => state.clusterView.pods;
export default clusterViewSlice.reducer;
