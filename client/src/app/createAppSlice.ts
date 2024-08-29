import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"

// This function creates a slice with async thunks
export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})
