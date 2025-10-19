export interface DatosContactoEmpresa {
    id: number;
    telefono_contacto: string;
    email_contacto: string;
    ciudad: string;
    provincia: string;
    pais: string;
    latitud: number;
    longitud: number;
}

export interface TipoEmpresa {
    id: number;
    nombre: string;
    descripcion: string;
    activo: number;
}


export interface Empresa {
    id: number;
    nombre: string;
    ruc: string;
    codigo_establecimiento: string;
    descripcion: string;
    activo: number;
    id_tipo_empresa: number;
    id_datos_contacto: number;
    direccion: string;
    horario_apertura: string;
    horario_cierre: string;
    id_administrador: number;
    creado_en: string;
    datosContactoEmpresa: DatosContactoEmpresa;
    tipoEmpresa: TipoEmpresa;
}