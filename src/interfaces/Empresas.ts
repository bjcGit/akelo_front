export interface Empresa {
    id_empresa:     string;
    razon_social:   string;
    nit:            string;
    direccion:      string;
    barrio:         string;
    comuna:         string;
    ciudad:         string;
    departamento:   string;
    latitud:        string;
    longitud:       string;
    fecha_Creacion: Date;
    estado:         boolean;
    user:           User;
    refreshTable: () => void;
}

export interface User {
    id:             string;
    nombre:         string;
    cc:             string;
    celular:        string;
    genero:         string;
    direccion:      string;
    rol:            string;
    correo:         string;
    fecha_creacion: Date;
    fecha_registro: Date;
    estado:         boolean;
}
