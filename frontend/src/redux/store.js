import { configureStore } from '@reduxjs/toolkit';
import firebaseAuthReducer from './firebaseAuthSlice';

const store = configureStore({
    reducer: {
        Fuser: firebaseAuthReducer,
    },
});

export default store;
