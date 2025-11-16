// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { signOut } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import TaskList from '../components/TaskList'; // Importamos TaskList

function DashboardPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('media');
  const { currentUser } = useAuth();

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("No estás autenticado. Inicia sesión de nuevo.");
      return;
    }
    try {
      await addDoc(collection(db, "tareas"), {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        status: "pendiente",
        createdAt: serverTimestamp(),
        userId: currentUser.uid
      });
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('media');
    } catch (error) {
      console.error("Error al crear la tarea: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Mi Panel de Tareas</h1>
        <button onClick={handleLogout} className="btn btn-secondary">
          Cerrar Sesión
        </button>
      </div>
      
      <form onSubmit={handleCreateTask} className="create-task-form">
        <h3>Crear Nueva Tarea</h3>
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Fecha Límite:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.g.target.value)}
            style={{ marginRight: 15, width: 'auto' }} // Dejamos este estilo
          />
          
          <label style={{ marginLeft: 15, marginRight: 5 }}>Prioridad:</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Agregar Tarea</button>
      </form>
      
      <TaskList />
    </div>
  );
}

export default DashboardPage;