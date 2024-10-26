# Backend - Implementaciones durante el Bootcamp con FactoriaF5 Madrid para la Seguridad en el Envío del Formulario

Este proyecto consiste en una aplicación web fullstack que cuenta con un formulario de acceso público. La aplicación tiene dos perfiles de usuario: administrador y usuario. Solo los usuarios registrados podrán acceder a la plataforma.

# Implementaciones de Seguridad del Servidor
Implementaciones de Seguridad del Servidor

Validación de Datos: Se validan todos los datos recibidos en los diferentes campos para prevenir ataques XSS. Se escapan las cadenas típicas utilizadas en XSS antes de enviar los datos al servidor.
Campos Ocultos: Se comprueba si los campos ocultos han sido cumplimentados antes de enviar el formulario al servidor para detectar posibles bots.
Ruta de Administración: Se ha implementado una ruta de administración con un sistema de login que da acceso al panel de control. Se crean dos tipos de usuarios: administrador y usuario.
CRUD de Usuarios: Se han implementado rutas para crear, editar y eliminar usuarios. Se valida mediante middleware que el usuario tenga el rol de administrador para acceder a estas rutas.
Seguridad de Contraseñas: Se aplican hash en las contraseñas para su cifrado antes de almacenarlas en la base de datos.
Middleware de Limitación de Peticiones: Se ha implementado un middleware en la ruta contra posibles ataques de fuerza bruta utilizando la librería express-rate-limit redis, limitando el número de peticiones aceptadas por IP.
Implementación de un sistema de almacenamiento de IPs maliciosas con bloqueo posterior durante un tiempo determinado.
Registro de logs de seguridad de las peticiones con detalles como fecha, IP, ruta, tipos de ataques, etc.





# Auditoría y Pruebas de Seguridad

Una vez finalizado el desarrollo, se realizarán pruebas para certificar la seguridad de la aplicación, incluyendo:

Análisis automático con Owasp Zap y siguiendo la guía de informes.
Pruebas de ataque de fuerza bruta con Burp Suite y fuzz.
Pruebas contra ataques DDoS con Nmap.
Pruebas contra SQLi y XSS.
Auditoría de los endpoints de la API buscando las 10 vulnerabilidades de Owasp.
Extras

Implementación de un sistema de almacenamiento de IPs maliciosas con bloqueo posterior durante un tiempo determinado.
Registro de logs de seguridad de las peticiones con detalles como fecha, IP, ruta, tipos de ataques, etc.
Dashboard para visualizar los ataques potenciales, gráficos de tráfico con filtros, IPs bloqueadas y opción de desbloquear.


Ir al Repositorio en GitHub:
Navega hasta el repositorio del frontend en GitHub. Si tienes el enlace directo, simplemente haz clic en él. De lo contrario, puedes buscar el repositorio utilizando el nombre del proyecto.
Descargar o Hacer Fork:
En la página del repositorio, encontrarás un botón llamado "Code" (o "Código"). Haz clic en él y se desplegará un menú.
Si deseas descargar el código directamente, selecciona "Download ZIP" (Descargar ZIP) y se descargará un archivo ZIP con el código.
Si prefieres hacer un fork del repositorio en tu cuenta de GitHub, selecciona "Fork" y se creará una copia del repositorio en tu cuenta.
Clonar el Repositorio (opcional):
Si hiciste un fork del repositorio y deseas trabajar en él desde tu máquina local, puedes clonar el repositorio a tu computadora.
Abre la terminal (en macOS o Linux) o Git Bash (en Windows).
Utiliza el siguiente comando para clonar el repositorio (reemplaza <URL_del_repositorio> con la URL de tu repositorio fork):

git clone <URL_del_repositorio>

## Funciones Principales

### 1. Crear Usuario 

### 2. Detectar ataques



### 3. Bloquear/desbloquear IP

Registra los albaranes de entrega asociados a los pedidos, con información como número de albarán, cliente, fecha, importe, y adjuntar archivos PDF o Word del albarán de entrega y el albarán firmado.



## Requisitos

- Node.js
- Base de Datos (MongoDB)

## Instalación

1. Clonar el repositorio desde [URL_DEL_REPOSITORIO].
2. Instalar las dependencias utilizando `npm install`.
3. Configurar la base de datos según las instrucciones proporcionadas.
4. Ejecutar el servidor con `npm start`.
              | Rama de frontend                                          |

# Technologias usadas

<br>
<a href="#"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&amp;logo=javascript&amp;logoColor=white&amp;labelColor=101010" alt="JavaScript"></a>
<br>
<a href="#"><img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&amp;logo=firebase&amp;logoColor=white&amp;labelColor=101010" alt="Firebase"></a>
<br>
<p></p>
<br>
<h4 id="frameworks">Frameworks</h4>
<p><a href="#"><img src="https://img.shields.io/badge/nodejs%20-%23DD0031.svg?&amp;style=for-the-badge&amp;logo=nodejs&amp;logoColor=white&amp;labelColor=101010" alt="NodeJS"></a>

<a href="#"><img src="https://img.shields.io/badge/react%20-%2320232a.svg?&amp;style=for-the-badge&amp;logo=react&amp;logoColor=%2361DAFB&amp;labelColor=101010" alt="React"></a>
<a href="#"><img src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&amp;style=for-the-badge&amp;labelColor=101010" alt="Express.js"></a>
</p><p></p>
<h4 id="version-control">Base de datos</h4>
<a href="#"><img src="https://img.shields.io/badge/Node.JS-339933?style=for-the-badge&amp;logo=node.js&amp;logoColor=white&amp;labelColor=101010" alt="Node.js"></a>
<a href="#"><img src="https://cdn.worldvectorlogo.com/logos/mongodb-icon-2.svg" alt="MongoDB"></a>


<h4 id="version-control">Version Control</h4>
<p><a href="#"><img src="https://img.shields.io/badge/git%20-%23F05033.svg?&amp;style=for-the-badge&amp;logo=git&amp;logoColor=white&amp;labelColor=101010" alt="Git"></a>
<a href="#"><img src="https://img.shields.io/badge/github%20-%23121011.svg?&amp;style=for-the-badge&amp;logo=github&amp;logoColor=whit&amp;logoColor=white&amp;labelColor=101010" alt="Github"></a></p>
<h3 id="containerization">Containerization</h3>
<p><a href="#"><img src="https://img.shields.io/badge/docker%20-%23F05033.svg?&amp;style=for-the-badge&amp;logo=docker&amp;logoColor=white&amp;labelColor=101010" alt="Docker"></a></p>

# Planificación

- Planificación de tareas en Trello
- Creación de prototipos en Figma.
- Respiración
- A diario
- Reunión de apiladores.

# Nuestro equipo

- Amanda Rodriguez(https://github.com/amanda1686)
- Abelardo Acosta(https://github.com/Moriarty369)
- Alejandro Vargas(https://github.com/AlejoxVargas)
- Lean Montoya(https://github.com/leamontoya19)
- Luis Alvarez(https://github.com/luisangelalvarez)

## Licencia

Este proyecto está bajo la Licencia. Para más detalles, por favor consulta el archivo LICENSE.

## Contribuyendo

Para contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Realiza un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit de ellos (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios al repositorio (`git push origin feature/nueva-funcionalidad`).
5. Crea un nuevo Pull Request.
