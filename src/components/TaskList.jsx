// src/components/TaskList.jsx
import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig"; 
import { useAuth } from '../context/AuthContext'; 
import TaskItem from './TaskItem';

function TaskList() {
  // ... (TODA la lógica de useState, useEffect, filtrado, etc., se queda IGUAL)
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(true); 
  const { currentUser, loading: authLoading } = useAuth(); 
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("todas");

  useEffect(() => {
    if (authLoading) return;
    if (!currentUser) {
      setTasks([]);
      setTasksLoading(false);
      return; 
    }
    setTasksLoading(true);
    const q = query(
      collection(db, "tareas"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const tasksData = [];
        querySnapshot.forEach((doc) => {
          tasksData.push({ ...doc.data(), id: doc.id });
        });
        setTasks(tasksData);
        setTasksLoading(false);
      }, 
      (error) => {
        console.error("Error al obtener tareas:", error);
        setTasksLoading(false);
      }
    );
    return () => unsubscribe();
  }, [currentUser, authLoading]);

  if (tasksLoading) {
    return <div>Cargando tareas...</div>;
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = 
      filterPriority === "todas" ? true : task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });
  
  const pendientes = filteredTasks.filter(t => t.status === 'pendiente');
  const enProgreso = filteredTasks.filter(t => t.status === 'en_progreso');
  const completadas = filteredTasks.filter(t => t.status === 'completada');
  // ... (Fin de la lógica)

  return (
    <div> 
      <div className="filter-bar">
        <input 
          type="text"
          placeholder="Buscar por título o descripción..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label>Prioridad: </label>
        <select 
          value={filterPriority} 
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="todas">Todas</option>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
      </div>

      <div className="task-columns-container">
        <div className="task-column">
          <h3>Pendientes ({pendientes.length})</h3>
          {pendientes.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>

        <div className="task-column">
          <h3>En Progreso ({enProgreso.length})</h3>
          {enProgreso.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>

        <div className="task-column">
          <h3>Completadas ({completadas.length})</h3>
          {completadas.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskList;