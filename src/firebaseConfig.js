// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración personal de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD5B7henNOuIXoX8_TeSAILENEy0LF3jF0",
  authDomain: "mi-app-tareas-proyecto.firebaseapp.com",
  projectId: "mi-app-tareas-proyecto",
  storageBucket: "mi-app-tareas-proyecto.firebasestorage.app",
  messagingSenderId: "646480781337",
  appId: "1:646480781337:web:c97c9375debcceb9c24a88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exportar los servicios que usaremos en la aplicación
export const auth = getAuth(app); // Servicio de Autenticación
export const db = getFirestore(app); // Servicio de Base de Datos (Firestore)