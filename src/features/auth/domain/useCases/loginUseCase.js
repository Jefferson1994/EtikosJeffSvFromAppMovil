import { loginUser } from '../../data/repositories/authRepository';
import { setAuthToken, setAuthUser } from '../../../../core/utils/storageService'; // Importamos el servicio


/**
 * Orquesta la lógica para el inicio de sesión.
 * Llama al repositorio y devuelve un resultado estructurado.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<{ success: boolean, user?: object, token?: string, error?: string }>}
 */
export const loginUseCase = async (email, password) => {
  try {
    const { user, token } = await loginUser(email, password);
    return { success: true, user, token };
  } catch (error) {
    // Captura el error del repositorio y lo devuelve
    return { success: false, error: error.message };
  }
};