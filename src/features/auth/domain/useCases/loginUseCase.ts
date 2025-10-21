import { loginUser, validarOtpLogin } from '../../data/repositories/authRepository';
import { setAuthToken, setAuthUser } from '../../../../core/utils/storageService'; // Importamos el servicio
import { LoginResult, UserCredentials, UserverificarCuenta } from '../interfaces/user';
import axios from 'axios';


export const loginUseCase = async (credentials: UserCredentials): Promise<LoginResult> => {
  

  try {

    const loginResult = await loginUser(credentials);
    return loginResult;

  } catch (error) {
    throw error;
  }
};

export const validarOtpLoginUseCase = async (
  usuarioVerificarCuenta: UserverificarCuenta
): Promise<LoginResult> => {

  console.log("Validando OTP con datos:", JSON.stringify(usuarioVerificarCuenta));

  try {
    // ✅ La llamada al repositorio (función importada, no 'this.repository')
    const respuesta = await validarOtpLogin(usuarioVerificarCuenta);
    return respuesta;

  } catch (error: any) {
 
    let errorMessage = 'Error de red. No fue posible conectar con el servidor.';

    if (axios.isAxiosError(error)) {
      
      if (error.response) {
        
        const errorBody = error.response.data;

        if (errorBody) {
          if (typeof errorBody === 'object' && errorBody.message) {
            errorMessage = errorBody.message;
          } else if (typeof errorBody === 'object' && errorBody.mensaje) {
            errorMessage = errorBody.mensaje;
          } else if (typeof errorBody === 'string') {
            errorMessage = errorBody;
          }
        }
        if (errorMessage === 'Error de red. No fue posible conectar con el servidor.') {
          errorMessage = `Error de servidor (${error.response.status}): ${error.response.statusText || 'Error desconocido'}`;
        }
      
      } 

    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
};