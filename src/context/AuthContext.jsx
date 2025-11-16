import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Importamos el auth de firebase

// 1. Creamos el contexto
const AuthContext = createContext();

// 2. Creamos un "hook" personalizado para usar el contexto fácilmente
export function useAuth() {
  return useContext(AuthContext);
}

// 3. Creamos el "Proveedor" que envolverá nuestra app
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Para saber si está cargando la info

  useEffect(() => {
    // onAuthStateChanged es un "oyente" de Firebase
    // Se ejecuta CADA VEZ que el estado de auth cambia (login, logout)
    // y también se ejecuta UNA VEZ al cargar la app.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // user será null si no hay sesión, o un objeto si la hay
      setLoading(false); // Ya terminó de cargar
    });

    // Nos desuscribimos del oyente cuando el componente se desmonta
    return unsubscribe;
  }, []);

  // Los valores que queremos que sean "globales"
  const value = {
    currentUser,
  };

  // Si está cargando, no mostramos la app.
  // Esto evita que la app "parpadee" del dashboard al login
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Devolvemos el proveedor con los valores globales
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}