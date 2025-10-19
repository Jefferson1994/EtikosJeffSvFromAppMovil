// src/features/auth/presentation/slices/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Aquí se agregarán otros reducers de otras features.
  },
});

export default store;