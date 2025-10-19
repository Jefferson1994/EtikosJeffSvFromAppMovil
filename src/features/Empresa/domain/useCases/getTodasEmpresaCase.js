// features/adminDashboard/domain/useCases/getTodasEmpresasXAdmin.js
import { todasEmpresasXAdminService } from '../../../Empresa/data/repositories/empresaRepository';
import { Empresa } from '../../../Empresa/domain/interfaces/empresa';

export const getTodasEmpresasXAdmin = async (idAdmin, authToken) => {
    try {
        if (typeof idAdmin !== 'number' || isNaN(idAdmin) || idAdmin <= 0 || !authToken) {
            throw new Error("ID de administrador o token de autenticación inválido.");
        }
        
        // Pasa el token al servicio
        const responseData = await todasEmpresasXAdminService(idAdmin, authToken);
        
        if (responseData && responseData.empresas) {
            return responseData.empresas;
        } else {
            throw new Error("La respuesta de la API no contiene el array de empresas.");
        }
    } catch (error) {
        console.error("Error en el caso de uso 'getTodasEmpresasXAdmin':", error);
        throw error;
    }
};