import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    src: ''
};
const iframeSlice = createSlice({
    name: 'iframe',
    initialState,
    reducers: {
        setIframeSrc: (state, action) => {
            state.src = action.payload;
        },
    },
});
export const { setIframeSrc } = iframeSlice.actions;
export default iframeSlice.reducer;
