import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { clusterApi } from "../features/cluster-view/clusterViewApiSlice";
import clusterViewReducer from "../features/cluster-view/clusterViewApiSlice";
import portalSliceReducer from "../features/captive-portal/captivePortalSlice";
// Combine the slices and RTK Query APIs into the root reducer
const rootReducer = combineReducers({
    [clusterApi.reducerPath]: clusterApi.reducer,
    clusterView: clusterViewReducer,
    // Add other slices and APIs here as needed
    portalSlice: portalSliceReducer,
});
// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
export const makeStore = (preloadedState) => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(clusterApi.middleware),
        preloadedState,
    });
    // configure listeners using the provided defaults
    // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
    setupListeners(store.dispatch);
    return store;
};
export const store = makeStore();
