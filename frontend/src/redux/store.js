import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import firebaseAuthReducer from './firebaseAuthSlice';

// Redux-Persist configuration
const persistConfig = {
    key: 'root',
    storage,     
    whitelist: ['Fuser'], 
};

const persistedReducer = persistReducer(persistConfig, firebaseAuthReducer);

const store = configureStore({
    reducer: {
        Fuser: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export default store;
