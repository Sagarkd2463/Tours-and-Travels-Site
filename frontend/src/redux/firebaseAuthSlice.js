import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
};

const firebaseAuthSlice = createSlice({
    name: 'Fuser',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
        updateToken: (state, action) => {
            state.token = action.payload;
        }
    },
});

export const { loginSuccess, logout, updateToken } = firebaseAuthSlice.actions;
export default firebaseAuthSlice.reducer;