

# Frontend Web  - Prueba Técnica Etikos 

Este repositorio contiene el cliente Movil (Frontend) del proyecto "Prueba Técnica -Etikos Jardín azuayo". Esta aplicación está desarrollada en **React Native y Expo** e implementa una **Arquitectura Limpia (Clean Architecture)** para garantizar la mantenibilidad y escalabilidad del código.



Esta aplicación consume una API REST desarrollada en Node.js, la cual gestiona la lógica de negocio, la autenticación de usuarios, y la comunicación con servicios de notificación como Gmail y Twilio y la base de datos.

## ✨ Características Principales

* **Autenticación Segura:** Implementación de inicio de sesión con correo y contraseña Las contraseñas se almacenan de forma segura usando Hashing con Bcrypt
* **Autenticación de Doble Factor (2FA):** Los usuarios pueden activar un segundo factor de autenticación. Al iniciar sesión, el sistema solicitará un código OTP enviado por correo electrónico y SMS

## Stack Tecnológico

* **React Native**
* **Expo**
* **TypeScript**
* **Redux (con Redux Toolkit):** Para el manejo del estado global de autenticación.
* **Axios:** Para las peticiones HTTP al backend.
* **React Navigation:** Para la navegación entre pantallas.


## 🚀 Prerrequisitos


### Prerrequisitos

1.  **Node.js** (v18 o superior).
2.  **npm** o **yarn**.
3.  **Expo CLI** (globalmente): `npm install -g expo-cli`.
4.  **Expo Go (App Móvil):** Tener instalada la app "Expo Go" en su dispositivo iOS o Android.
5.  **Backend Corriendo:** El servido debe estar ejecutándose localmente (ej. en `http://localhost:3000`).

## ⚙️ Instalación y Puesta en Marcha


1.  **Clonar el repositorio**

    git clone y el link de este repositorio

2.  **Acceder al directorio del proyecto**
    cd EtikosJeffSvFromAppMovil


3.  **Instalar dependencias**
    npm install


4.  **Configurar el Entorno**
    Este proyecto necesita conectarse a la API de backend.  `src/app/environments/environment.ts` hay dos url podemos apuntar al back local o al back desplegado 
    en render.

    El prefijo de la API de preproducción desplegada en Render es: `https://etikosjeffsvback.onrender.com/`.

5.  **Ejecutar el Servidor de Desarrollo**
    Inicia el servidor de desarrollo local:
    ```bash
    npx expo start
    ```
    React te permitira abbri en plaformas web como movil nosotros scaneramos el qr con la app que de expo y se ejecutara 
    la app web 

## 🧪 Credenciales de Prueba (Administrador)

Para probar las funcionalidades de administración como bloquear/desbloquear usuarios, puedes utilizar las siguientes credenciales:

* **Email:** `pruebaEtikos1@outlook.com` 
* **Password:** `Etikos12025#` 

### 6. Arquitectura 

Arquitectura General del sistema 

![Diagrama de Arquitectura del Sistema](./docs/ArquitecturaGeneral.png)


Arquitectura Limpia en  el Frontend Web

![Diagrama de Arquitectura del Backend](./docs/cleanArquitecture.png)







---




