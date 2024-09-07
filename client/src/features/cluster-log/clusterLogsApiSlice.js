import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";
// Define an API service for the log page
export const clusterLogsApi = createApi({
    reducerPath: "clusterLogsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
    endpoints: builder => ({
        getClusterLogs: builder.query({
            query: () => "api/getLogs",
        }),
    }),
});
// Auto-generated hooks for the API queries
export const { useGetClusterLogsQuery } = clusterLogsApi;
const initialState = {
    logs: ["no logs"],
};
export const clusterLogsSlice = createSlice({
    name: "clusterLogs",
    initialState,
    reducers: {
    // Define any additional reducers here if needed
    },
});
// Selectors for any additional state managed in this slice
export const selectClusterLogs = (state) => state.clusterLogs.logs;
export default clusterLogsSlice.reducer;
