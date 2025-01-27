import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import firebaseAuthReducer from './firebaseAuthSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['Fuser'],
    version: 1,
};

const rootReducer = combineReducers({
    Fuser: firebaseAuthReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export default store;
