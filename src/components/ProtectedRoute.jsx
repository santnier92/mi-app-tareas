import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importamos nuestro hook

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth(); // Obtenemos el usuario "global"

  // Si NO hay un usuario...
  if (!currentUser) {
    // ...redirigimos a la página de login
    return <Navigate to="/login" />;
  }

  // Si SÍ hay un usuario, mostramos el componente hijo (la página)
  return children;
}

export default ProtectedRoute;