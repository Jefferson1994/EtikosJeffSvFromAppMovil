import { registerUser } from '../../data/repositories/authRepository';

export const registerUserUseCase = async (userData) => {
  try {
    const newUser = await registerUser(userData);
    return { success: true, user: newUser };
  } catch (error) {
    // Captura el error del repositorio y lo devuelve
    return { success: false, error: error.message };
  }
};