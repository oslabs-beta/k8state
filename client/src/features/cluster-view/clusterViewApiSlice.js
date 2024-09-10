import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";
// Define an API service for the cluster view
export const clusterApi = createApi({
    reducerPath: "clusterApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
    endpoints: builder => ({
        getKubernetesNodes: builder.query({
            query: () => "api/nodes",
        }),
        getKubernetesPods: builder.query({
            query: () => "api/pods",
        }),
        getKubernetesServices: builder.query({
            query: () => "api/services",
        }),
    }),
});
// Auto-generated hooks for the API queries
export const { useGetKubernetesNodesQuery, useGetKubernetesPodsQuery, useGetKubernetesServicesQuery, } = clusterApi;
const initialState = {
    pods: ["pod_1"],
};
export const clusterViewSlice = createSlice({
    name: "clusterView",
    initialState,
    reducers: {},
});
// Selectors for any additional state managed in this slice
export const selectPods = (state) => state.clusterView.pods;
export default clusterViewSlice.reducer;
