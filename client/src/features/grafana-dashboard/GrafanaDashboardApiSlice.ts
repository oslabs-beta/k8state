import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

// Define the initial state for the iframe URL
interface IframeState {
  src: string;
}

const initialState: IframeState = {
  src: ''
};

const iframeSlice = createSlice({
  name: 'iframe',
  initialState,
  reducers: {
    setIframeSrc: (state, action: PayloadAction<string>) => {
      state.src = action.payload;
    },
  },
});

export const { setIframeSrc } = iframeSlice.actions;
export default iframeSlice.reducer;