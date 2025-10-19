// features/adminDashboard/application/services/todasEmpresasXAdminService.js
import axios from 'axios';

const API_BASE_URL = 'http://192.168.100.50:3000/empresa';

export const todasEmpresasXAdminService = async (idAdmin, authToken) => {
    try {
        const requestBody = { id_administrador: idAdmin };

        const response = await axios.post(`${API_BASE_URL}/todasEmpresasXAdmin`, requestBody, {
            headers: {
                'Content-Type': 'application/json',
                // Añade el token JWT a la cabecera 'Authorization'
                'Authorization': `Bearer ${authToken}`,
            },
        });

        return response.data;
    } catch (error) {
        // Maneja y propaga los errores, incluyendo los de autenticación
        const errorMessage = error.response?.data?.mensaje || 'Error al obtener las empresas.';
        console.error("Error en todasEmpresasXAdminService:", error);
        throw new Error(errorMessage);
    }
};