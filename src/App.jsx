// src/App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    // Solo añadimos el className
    <div className="app-container">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default App;