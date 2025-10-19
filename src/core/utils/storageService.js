// src/core/utils/storageService.js

import AsyncStorage from '@react-native-async-storage/async-storage';

// Claves para almacenar el token y el usuario
const AUTH_TOKEN_KEY = 'authToken';
const AUTH_USER_KEY = 'authUser';

/**
 * Guarda el token de autenticación en AsyncStorage.
 * @param {string} token - El token JWT.
 */
export const setAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (e) {
    console.error('Error al guardar el token:', e);
  }
};

/**
 * Guarda la información del usuario en AsyncStorage.
 * @param {object} user - El objeto de usuario a guardar.
 */
export const setAuthUser = async (user) => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem(AUTH_USER_KEY, jsonValue);
  } catch (e) {
    console.error('Error al guardar el usuario:', e);
  }
};

/**
 * Recupera el token de autenticación de AsyncStorage.
 * @returns {Promise<string | null>}
 */
export const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  } catch (e) {
    console.error('Error al obtener el token:', e);
    return null;
  }
};

/**
 * Recupera la información del usuario de AsyncStorage.
 * @returns {Promise<object | null>}
 */
export const getAuthUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(AUTH_USER_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error al obtener el usuario:', e);
    return null;
  }
};

/**
 * Elimina el token y la información del usuario.
 */
export const clearAuthData = async () => {
  try {
    await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, AUTH_USER_KEY]);
  } catch (e) {
    console.error('Error al limpiar los datos de autenticación:', e);
  }
};