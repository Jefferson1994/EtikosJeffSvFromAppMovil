import axios from 'axios';

// Asegúrate de que esta sea la IP de tu PC
const API_BASE_URL = 'http://192.168.100.50:3000/user'; 

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/createUser`, userData);
    return response.data;
  } catch (error) {
    // Es importante propagar el error para que el caso de uso lo maneje
    throw new Error('Error al registrar usuario: ' + error.message);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email: email,
      password: password,
    });
    
    // La API devuelve directamente 'user' y 'token' en el cuerpo de la respuesta.
    const { user, token } = response.data;
    
    return { user, token };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // La API respondió con un error (ej. credenciales incorrectas).
        throw new Error(error.response.data.message || 'Credenciales incorrectas. Por favor, revisa tus datos.');
      } else if (error.request) {
        // No se recibió respuesta del servidor.
        throw new Error('No se pudo conectar con el servidor. Por favor, verifica tu conexión.');
      }
    }
    // Otro error inesperado.
    throw new Error('Ocurrió un error inesperado al iniciar sesión.');
  }
};


