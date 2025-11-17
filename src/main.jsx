import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. AÑADIMOS 'Navigate' A LA IMPORTACIÓN
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';

// --- Importamos el AuthProvider ---
import { AuthProvider } from './context/AuthContext';

// Importamos el layout principal y nuestras nuevas páginas
import App from './App.jsx';
import LoginPage from './pages/Login.jsx';
import RegisterPage from './pages/Register.jsx';
import DashboardPage from './pages/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        // 2. AÑADIMOS LA RUTA RAÍZ (/) PARA REDIRIGIR
        path: '/',
        element: <Navigate to="/login" replace />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* --- Envolvemos la app --- */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);