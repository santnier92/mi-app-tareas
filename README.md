🚀 Proyecto: Gestor de Tareas (App de Tareas)
¡Bienvenido! Esta es una aplicación web completa de tipo "To-Do List" creada como parte de un proyecto universitario. Permite a los usuarios gestionar sus tareas diarias de manera eficiente, desde la creación hasta su finalización.

Enlace a la App en vivo (Demo)
https://github.com/santnier92/mi-app-tareas
---
✨ Características Principales
Esta aplicación implementa una funcionalidad CRUD (Crear, Leer, Actualizar, Borrar) completa, e incluye:

Autenticación de Usuarios:

- Registro de nuevas cuentas de usuario.

- Inicio de sesión (Login) con cuentas existentes.

- Rutas protegidas: solo los usuarios autenticados pueden acceder al panel de tareas.

Gestión de Tareas:

- Crear nuevas tareas especificando título, descripción, fecha de vencimiento y prioridad (Alta, Media, Baja).

- Visualizar todas las tareas organizadas en un tablero Kanban de tres columnas:

- Pendientes

- En Progreso

- Completadas

Actualizar (Editar):

- Mover tareas entre estados (ej. de "Pendiente" a "En Progreso").

- Editar el contenido completo de una tarea (título, descripción, etc.) a través de un modal.

Eliminar tareas.

Búsqueda y Filtrado:

- Un campo de búsqueda en tiempo real que filtra tareas por título o descripción.

- Un filtro desplegable para ver tareas por prioridad.

🛠️ Tecnologías Utilizadas
Este proyecto fue construido utilizando un stack moderno de JavaScript:

- Frontend: React.js (creado con Vite)

- Routing: React Router DOM

- Backend como Servicio (BaaS): Firebase

- Autenticación: Firebase Authentication (para manejo de usuarios)

- Base de Datos: Cloud Firestore (base de datos NoSQL en tiempo real)

Estilos: CSS3 (con estilos modulares en el archivo index.css)

⚙️ Cómo Ejecutar este Proyecto Localmente
Si deseas clonar y ejecutar esta aplicación en tu máquina local, sigue estos pasos:

Clona el repositorio:

Bash

- git clone https://github.com/santnier92/mi-app-tareas.git
- cd C:\Users\stiag\Documents\Archivos Santi\Universidad trabajos y sesiones\Sexto semestre\Herramientas de Software\Actividad 6\mi-app-tareas
Instala las dependencias:

Bash

npm install
Configura Firebase:

- Ve a la Consola de Firebase y crea un nuevo proyecto.

- Habilita dos servicios:

1. Authentication (con el proveedor "Email/Contraseña").

2. Firestore Database (en modo de prueba).

- En la configuración de tu proyecto, registra una nueva "Web App" (</>).

- Firebase te dará un objeto de configuración firebaseConfig.

4. Crea tu archivo de entorno:

- En la carpeta src/, crea un archivo llamado firebaseConfig.js.

- Pega el siguiente código y llénalo con los datos del paso anterior:

JavaScript

// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Pega tu configuración personal de Firebase aquí
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
5. Crea el Índice de Firestore (¡Importante!)

- La primera vez que ejecutes la app y vayas al dashboard, la lista de tareas fallará.

- Abre la consola de desarrollador (F12) y busca un error de Firestore que incluya un enlace para crear un índice.

- Haz clic en ese enlace, crea el índice y espera 2-3 minutos. (El índice es necesario para la consulta where("userId", "==", ...) orderBy("createdAt", ...)).

6. ¡Ejecuta la aplicación!

Bash

npm run dev
Abre http://localhost:5173 (o la URL que te indique la terminal) en tu navegador.
