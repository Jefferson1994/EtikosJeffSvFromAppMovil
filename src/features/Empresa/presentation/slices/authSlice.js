// src/features/auth/presentation/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getAuthToken, getAuthUser, clearAuthData } from '../../../../core/utils/storageService';

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isInitializing: true, // Nuevo estado para la carga inicial
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
    // Nueva acción para inicializar el estado desde el almacenamiento
    setAuthFromStorage: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.token;
      state.isInitializing = false;
    },
    setInitializing: (state, action) => {
      state.isInitializing = action.payload;
    },
  },
});

export const { setLoading, loginSuccess, loginFailure, logout, setAuthFromStorage, setInitializing } = authSlice.actions;

// Acción asíncrona para cargar la sesión al inicio de la app
export const initializeAuth = () => async (dispatch) => {
  try {
    const token = await getAuthToken();
    const user = await getAuthUser();
    dispatch(setAuthFromStorage({ token, user }));
  } catch (e) {
    console.error('Error al inicializar la autenticación:', e);
    dispatch(setInitializing(false));
  }
};

// Modifica la acción de logout para limpiar el almacenamiento
export const logoutAndClearStorage = () => async (dispatch) => {
  await clearAuthData();
  dispatch(logout());
};

export default authSlice.reducer;