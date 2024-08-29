import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    address: '',
    key: '',
    init: false,
};
export const portalSlice = createSlice({
    name: 'portalSlice',
    initialState,
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload;
        },
        setKey: (state, action) => {
            state.key = action.payload;
        },
        setInit: (state, action) => {
            state.init = action.payload;
        }
    }
});
export const { setAddress, setKey, setInit } = portalSlice.actions;
export default portalSlice.reducer;
