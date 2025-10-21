export interface UserRegistrationData {
  nombre: string;
  correo: string;
  contrasena: string;
  id_rol: number;
  numero_telefono: string;
  numero_identificacion: string;
  codigo_punto_emision_movil: string;
}


export interface UserResponse {
  message: string;
  user: {
    id: number;
    nombre: string;
    correo: string;
    id_rol: number;
    numero_telefono: string;
    numero_identificacion: string;
    creado_en: string;
    activo: number;
    autentificacion_dos_pasos_activa: number;
    negociosAdministrados: any[];
    rol: {
      id: number;
      nombre: string;
      descripcion: string;
      activo: number;
    };
  };
  token: string;
}
export interface UserCredentials {
  email: string;
  password: string;
}
export interface TwoFactorRequiredResponse {
  twoFactorRequired: true;
  message: string;
}


export type LoginResult = UserResponse | TwoFactorRequiredResponse;
export interface UserverificarCuenta {
  correo: string;
  codigoOtp: string;
}

export interface CrearUsuarioDTO {
  nombre: string;
  correo: string;
  contrasena: string;
  id_rol: number;
  numero_telefono: string;
  numero_identificacion: string;
}

export interface CrearUsuarioResponse {
  mensaje: string;
  usuario: {
    nombre: string;
    correo: string;
    id_rol: number;
    numero_telefono: string;
    numero_identificacion: string;
    id: number;
    creado_en: string;
    activo: number;
  };
}