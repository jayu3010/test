import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import reduxData from '@/utils/redux/features/reduxData';

// Define persistConfig
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['reduxData'],
};

// Create persistedReducer
const persistedReducer = persistReducer(persistConfig, reduxData);

// Configure store with persistedReducer
export const store = configureStore({
  reducer: persistedReducer,
});

// Create a persisted version of the store
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
