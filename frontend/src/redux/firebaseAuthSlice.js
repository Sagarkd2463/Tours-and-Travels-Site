import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('Fuser')) || null,
    token: localStorage.getItem('access_Token') || null,
};

const firebaseAuthSlice = createSlice({
    name: 'Fuser',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            localStorage.setItem('Fuser', JSON.stringify(user));
            localStorage.setItem('access_Token', token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('Fuser');
            localStorage.removeItem('access_Token');
        },
    },
});

export const { loginSuccess, logout } = firebaseAuthSlice.actions;
export default firebaseAuthSlice.reducer;