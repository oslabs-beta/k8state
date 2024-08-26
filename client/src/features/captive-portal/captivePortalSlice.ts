import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initial {
    address: string;
    key: string;
}

const initialState: initial = {
    address: '',
    key: ''
};

export const portalSlice = createSlice({
    name: 'portalSlice',
    initialState,
    reducers: {
        setAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        },
        setKey: (state, action: PayloadAction<string>) => {
            state.key = action.payload;
        }
    }
});
export const { setAddress, setKey } = portalSlice.actions;

export default portalSlice.reducer