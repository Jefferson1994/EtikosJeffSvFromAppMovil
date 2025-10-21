import axios from 'axios';
import { UserCredentials, LoginResult, UserverificarCuenta, CrearUsuarioDTO, CrearUsuarioResponse } from '../../domain/interfaces/user';
// Asegúrate de que esta sea la IP de tu PC
const API_BASE_URL = 'http://192.168.100.50:3000/user'; 

export const crearUsuario = async (
  crearUsario: CrearUsuarioDTO
): Promise<CrearUsuarioResponse> => {
  
  const url = `${API_BASE_URL}/createUser`;
  console.log('la url es ', url);

  try {

    const response = await axios.post<CrearUsuarioResponse>(url, crearUsario);
  
    return response.data;

  } catch (error) {
    // 4. Mejoramos el manejo 
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data.message || 'Ocurrió un error al crear el usuario.'
        );
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor.');
      }
    }
    throw new Error('Ocurrió un error inesperado al crear la cuenta.');
  }
};

export const loginUser = async (credentials: UserCredentials): Promise<LoginResult> => {
  const url = `${API_BASE_URL}/login`;
  console.log(url)

  try {
    const response = await axios.post<LoginResult>(url, credentials);
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Credenciales incorrectas.');
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor. Verifica tu conexión.');
      }
    }
    throw new Error('Ocurrió un error inesperado al iniciar sesión.');
  }
};

export const validarOtpLogin = async (userRecuperar: UserverificarCuenta): Promise<LoginResult> => {
  const url = `${API_BASE_URL}/validarOtp2Fa`;
  console.log(url)

  try {
    console.log('antes de enviar');
    const response = await axios.post<LoginResult>(url, userRecuperar);
    console.log('la data de respuesta', response.data)
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message || 'El código de verificación es incorrecto.');
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor.');
      }
    }
    throw new Error('Ocurrió un error inesperado al verificar el código.');
  }
};



