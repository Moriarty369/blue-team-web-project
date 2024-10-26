# Frontend - Implementations During Bootcamp with FactoriaF5 Madrid for Secure Form Submission

This project is a full-stack web application with a publicly accessible form. The application has two user profiles: administrator and user. Only registered users can access the platform.

## Clone the Project:

Go to the Repository on GitHub: Navigate to the frontend repository on GitHub. If you have the direct link, simply click on it. Otherwise, you can search for the repository using the project name.

Project Link: https://github.com/Moriarty369/react-blue-team-project.git

## Instructions:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Moriarty369/react-blue-team-project.git
   cd react-blue-team-project
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```
3. **Set up the database: **
   Configure MongoDB following the detailed instructions in the corresponding documentation.

4. **Run the server locally:**
   ```bash
   npm start
   ```
5. **In another terminal, also start the client (frontend) folder:**
   ```bash
   npm start
   ```
Test the Main Features
Log in as an administrator to access the security dashboard and view user data, logs, and IP blocking/unblocking options.
Use a registered user profile to see protected routes and features.

## Main Features:

### 1. User Creation
Allows user creation and management, including data such as name, username, email, with constraints on duplicate emails and usernames in the database.

### 2. Admin Login
Login for admin users with access to protected routes.

### 3. User Login
Login for users with protected routes leading to the profile information page.

### 4. Dashboard to View Potential Attacks
Displays line graphs, registered user data tables, security logs, and manual malicious IP blocking/unblocking.

## Requirements:
Node.js
Database (MongoDB)

## Technologies Used:
<p> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white&labelColor=101010" alt="JavaScript"> <img src="https://img.shields.io/badge/Node.JS-339933?style=for-the-badge&logo=node.js&logoColor=white&labelColor=101010" alt="Node.js"> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" > <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" > <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"> </p>

## Planning:
- Task planning in Trello
- Iterative cycles
- Daily updates
- Minimal downtime

## License:

This project is under License. For more details, please see the LICENSE file.

## Contributing:

To contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/new-feature).
3. Make your changes and commit them (git commit -am 'Add new feature').
4. Push your changes to the repository (git push origin feature/new-feature).
5. Create a new Pull Request.

# Backend - Implementations During Bootcamp with FactoriaF5 Madrid for Secure Form Submission

This project is a full-stack web application with a publicly accessible form. The application has two user profiles: administrator and user. Only registered users can access the platform.

## Server Security Implementations:

1. Data Validation: All received data is validated across different fields to prevent XSS attacks. Typical XSS strings are escaped before sending data to the server.
2. Hidden Fields: Hidden fields are checked before sending the form to the server to detect potential bots. Admin Route: An admin route with a login system has been implemented to access the control panel. Two user roles are created: administrator and user.
3. User CRUD: Routes have been implemented for creating, editing, and deleting users. Middleware validates that only users with the admin role can access these routes.
4.  Password Security: Password hashing is applied to encrypt passwords before storing them in the database.
5.  Rate-Limiting Middleware: Middleware has been implemented on the route to prevent brute-force attacks using the express-rate-limit and Redis libraries, limiting the number of requests per IP.
6.  Implementation of a system to store malicious IPs with subsequent blocking for a set period. Logging of security logs with details such as date, IP, route, attack types, etc.

## Security Audits and Tests:
After development is complete, tests will be conducted to certify the application's security, including:

1. Automatic analysis with OWASP Zap following report guidelines.
2. Brute-force attack tests with Burp Suite and fuzz testing.
3. DDoS attack testing with Nmap.
4. SQLi and XSS attack testing.
5. API endpoint auditing for the top 10 OWASP vulnerabilities.

## Extras:

Implementation of a system to store malicious IPs with subsequent blocking for a set period.
Logging of security logs with details such as date, IP, route, attack types, etc.
Dashboard to view potential attacks, traffic graphs with filters, blocked IPs, and an option to unblock.

## Main Features:

### 1. User Creation
### 2. Attack Detection
### 3. Block/Unblock IPs

## Technologies Used:
Languages and Tools
<p> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white&labelColor=101010" alt="JavaScript" height="24px"> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white&labelColor=101010" alt="Firebase" height="24px"> </p>
Frameworks y Librerías
<p> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white&labelColor=101010" alt="NodeJS" height="24px"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=101010&labelColor=101010" alt="React" height="24px"> <img src="https://img.shields.io/badge/Express.js-404d59?style=for-the-badge&logo=express&labelColor=101010" alt="Express.js" height="24px"> </p>
Bases de Datos
<p> <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white&labelColor=101010" alt="MongoDB" height="24px"> </p>
Control de Versiones
<p> <img src="https://img.shields.io/badge/Git-F05033?style=for-the-badge&logo=git&logoColor=white&labelColor=101010" alt="Git" height="24px"> <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white&labelColor=101010" alt="GitHub" height="24px"> </p>
Contenerización
<p> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white&labelColor=101010" alt="Docker" height="24px"> </p>

## License:
This project is under License. For more details, please see the LICENSE file.
- Abelardo Acosta (https://github.com/Moriarty369)


# ESPAÑOL:

# Frontend - Implementaciones durante el Bootcamp con FactoriaF5 Madrid para la Seguridad en el Envío del Formulario

Este proyecto consiste en una aplicación web fullstack que cuenta con un formulario de acceso público. La aplicación tiene dos perfiles de usuario: administrador y usuario. Solo los usuarios registrados podrán acceder a la plataforma.

## Clonar proyecto:

Ir al Repositorio en GitHub:
Navega hasta el repositorio del frontend en GitHub. Si tienes el enlace directo, simplemente haz clic en él. De lo contrario, puedes buscar el repositorio utilizando el nombre del proyecto.

## Link proyecto:
https://github.com/Moriarty369/react-blue-team-project.git

## Instrucciones:

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/Moriarty369/react-blue-team-project.git
   cd react-blue-team-project
   ```

2. **Instala las dependencias de Node.js:**
   ```bash
   npm install
   ```
   
3. **Configura la base de datos:**
   Configura MongoDB siguiendo las instrucciones detalladas en la documentación correspondiente.

4. **Ejecuta el servidor localmente:**
   ```bash
   npm start
   ```
5. **En otra terminal, ejecuta también el lado (carpeta) del cliente:**
   ```bash
   npm start
   ```

Prueba las funciones principales:
Inicia sesión como administrador para acceder al panel de seguridad y ver los datos de usuarios, logs, y opciones de bloqueo/desbloqueo de IPs.
Usa un perfil de usuario registrado para ver las rutas y funcionalidades protegidas.

## Funciones Principales:

### 1. Crear Usuario
Permite la creación y gestión de usuarios, incluyendo datos como nombre, username, email, con restricciones en email y username repetidos en BD.

### 2. Login de Admin
Login para usuario con ruta protegidas.

### 3. Login Usuario
Login Para usuario con rutas protegidas hacia pagina de información de perfil

### 4. Dashboard para visualizar los ataques potenciales, gráficos de líneas, mapa de deolocalización de ataques,  tabla de datos de usuarios registrados, logs de segurida, bloquedo o desbloqueo manual de de ip maliciosa.

## Requisitos

- Node.js
- Base de Datos (MongoDB)

## Tecnologías Usadas:
<p> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white&labelColor=101010" alt="JavaScript"> <img src="https://img.shields.io/badge/Node.JS-339933?style=for-the-badge&logo=node.js&logoColor=white&labelColor=101010" alt="Node.js"> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" > <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" > <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"> </p>

## Planificación:
- Planificación de tareas en Trello
- Respiración
- A diario
- Poco descanso

## Licencia:
Este proyecto está bajo la Licencia. Para más detalles, por favor consulta el archivo LICENSE.

## Contribuyendo:
Para contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Realiza un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit de ellos (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios al repositorio (`git push origin feature/nueva-funcionalidad`).
5. Crea un nuevo Pull Request.

# Backend - Implementaciones durante el Bootcamp con FactoriaF5 Madrid para la Seguridad en el Envío del Formulario

Este proyecto consiste en una aplicación web fullstack que cuenta con un formulario de acceso público. La aplicación tiene dos perfiles de usuario: administrador y usuario. Solo los usuarios registrados podrán acceder a la plataforma.

## Implementaciones de Seguridad del Servidor

1. Validación de Datos: Se validan todos los datos recibidos en los diferentes campos para prevenir ataques XSS. Se escapan las cadenas típicas utilizadas en XSS antes de enviar los datos al servidor.
2. Campos Ocultos: Se comprueba si los campos ocultos han sido cumplimentados antes de enviar el formulario al servidor para detectar posibles bots.
Ruta de Administración: Se ha implementado una ruta de administración con un sistema de login que da acceso al panel de control. Se crean dos tipos de usuarios: administrador y usuario.
3. CRUD de Usuarios: Se han implementado rutas para crear, editar y eliminar usuarios. Se valida mediante middleware que el usuario tenga el rol de administrador para acceder a estas rutas.
Seguridad de Contraseñas: Se aplican hash en las contraseñas para su cifrado antes de almacenarlas en la base de datos.
4. Middleware de Limitación de Peticiones: Se ha implementado un middleware en la ruta contra posibles ataques de fuerza bruta utilizando la librería express-rate-limit redis, limitando el número de peticiones aceptadas por IP.
5. Implementación de un sistema de almacenamiento de IPs maliciosas con bloqueo posterior durante un tiempo determinado.
6. Registro de logs de seguridad de las peticiones con detalles como fecha, IP, ruta, tipos de ataques, etc.

## Auditoría y Pruebas de Seguridad

Una vez finalizado el desarrollo, se realizarán pruebas para certificar la seguridad de la aplicación, incluyendo:

Análisis automático con Owasp Zap y siguiendo la guía de informes.
Pruebas de ataque de fuerza bruta con Burp Suite y fuzz.
Pruebas contra ataques DDoS con Nmap.
Pruebas contra SQLi y XSS.
Auditoría de los endpoints de la API buscando las 10 vulnerabilidades de Owasp.


## Extras

Implementación de un sistema de almacenamiento de IPs maliciosas con bloqueo posterior durante un tiempo determinado.
Registro de logs de seguridad de las peticiones con detalles como fecha, IP, ruta, tipos de ataques, etc.
Dashboard para visualizar los ataques potenciales, gráficos de tráfico con filtros, IPs bloqueadas y opción de desbloquear.

## Funciones Principales

### 1. Crear Usuario

### 2. Detectar ataques

### 3. Bloquear/desbloquear IP

## Tecnologías Usadas:
Lenguajes y Herramientas
<p> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white&labelColor=101010" alt="JavaScript" height="24px"> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white&labelColor=101010" alt="Firebase" height="24px"> </p>
Frameworks y Librerías
<p> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white&labelColor=101010" alt="NodeJS" height="24px"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=101010&labelColor=101010" alt="React" height="24px"> <img src="https://img.shields.io/badge/Express.js-404d59?style=for-the-badge&logo=express&labelColor=101010" alt="Express.js" height="24px"> </p>
Bases de Datos
<p> <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white&labelColor=101010" alt="MongoDB" height="24px"> </p>
Control de Versiones
<p> <img src="https://img.shields.io/badge/Git-F05033?style=for-the-badge&logo=git&logoColor=white&labelColor=101010" alt="Git" height="24px"> <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white&labelColor=101010" alt="GitHub" height="24px"> </p>
Contenerización
<p> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white&labelColor=101010" alt="Docker" height="24px"> </p>

## Licencia:
Este proyecto está bajo la Licencia. Para más detalles, por favor consulta el archivo LICENSE.
- Abelardo Acosta(https://github.com/Moriarty369)
