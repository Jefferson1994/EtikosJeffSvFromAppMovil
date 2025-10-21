import axios from 'axios'; // Importamos axios para el manejo de errores
import { CrearUsuarioDTO, CrearUsuarioResponse } from '../interfaces/user';

import { crearUsuario } from '../../data/repositories/authRepository'; // Ajusta la ruta


export const crearUsuarioUseCase = async (
  crearUsuarioDTO: CrearUsuarioDTO
): Promise<CrearUsuarioResponse> => {
  
  // console.log("Creando usuario con datos:", JSON.stringify(crearUsuarioDTO));
  
  try {
    // La llamada al repositorio (que es "tonto" y solo relanza)
    const respuesta = await crearUsuario(crearUsuarioDTO);
    return respuesta;

  } catch (error: any) {
    // --- LÓGICA DE ERROR INTELIGENTE ---
    // (Esta es la lógica que tenías en tu 'execute' de Angular)
    
    let errorMessage = 'Ocurrió un error inesperado al registrar el usuario.';

    // Verificamos si es un error de Axios con respuesta
    if (axios.isAxiosError(error) && error.response && error.response.data) {
      
      const errorBody = error.response.data;

      // Buscamos 'mensaje' (con N), como en tu backend
      if (typeof errorBody === 'object' && errorBody.mensaje) {
        errorMessage = errorBody.mensaje;
      } 
      // O 'message' (con M) por si acaso
      else if (typeof errorBody === 'object' && errorBody.message) {
        errorMessage = errorBody.message;
      }
      
    } else if (error instanceof Error) {
      // Captura errores que no son de Axios
      errorMessage = error.message;
    }

    // Lanzamos un NUEVO error, pero solo con el mensaje limpio
    throw new Error(errorMessage);
  }
}