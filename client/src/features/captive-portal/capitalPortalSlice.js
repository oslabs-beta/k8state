import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    address: '',
    key: ''
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
        }
    }
});
export const { setAddress, setKey } = portalSlice.actions;
export default portalSlice.reducer;
