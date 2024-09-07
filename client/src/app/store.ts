import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query/react"

import { clusterApi } from "../features/cluster-view/clusterViewApiSlice"
import { clusterLogsApi } from "../features/cluster-log/clusterLogsApiSlice"
import { prometheusApi } from "../features/prometheus-view/prometheusViewApiSlice"

import portalSliceReducer from "../features/captive-portal/captivePortalSlice"

import clusterViewReducer from "../features/cluster-view/clusterViewApiSlice"
import prometheusViewReducer from "../features/prometheus-view/prometheusViewApiSlice"
import clusterLogsReducer from "../features/cluster-log/clusterLogsApiSlice"

// Combine the slices and RTK Query APIs into the root reducer
const rootReducer = combineReducers({
  [clusterApi.reducerPath]: clusterApi.reducer, // Adding the RTK Query reducer
  [prometheusApi.reducerPath]: prometheusApi.reducer, // Adding the RTK Query reducer
  [clusterLogsApi.reducerPath]: clusterLogsApi.reducer, // Adding the RTK Query reducer
  clusterView: clusterViewReducer, // Adding the clusterView slice reducer
  portalSlice: portalSliceReducer, // Adding the portal slice reducer
  prometheusView: prometheusViewReducer, // Adding the grafanaView slice reducer
  clusterLogs: clusterLogsReducer, // Adding the clusterLogs slice reducer
})

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        clusterApi.middleware,
        prometheusApi.middleware,
        clusterLogsApi.middleware,
      ), // Adding RTK Query middleware

    preloadedState,
  })

  // configure listeners using the provided defaults
  // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

// Infer the type of `store`
export type AppStore = ReturnType<typeof makeStore>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
