// src/components/TaskItem.jsx

import React, { useState } from 'react';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import EditModal from './EditModal';

function TaskItem({ task }) {
  const [isEditing, setIsEditing] = useState(false);

  // --- LÓGICA DE LAS FUNCIONES (AHORA COMPLETA) ---
  const handleStatusChange = async (newStatus) => {
    const taskDocRef = doc(db, "tareas", task.id);
    try {
      // Esta es la línea que faltaba:
      await updateDoc(taskDocRef, {
        status: newStatus
      });
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  const handleDelete = async () => {
    // Esta es la lógica que faltaba:
    if (window.confirm(`¿Seguro que quieres eliminar la tarea: "${task.title}"?`)) {
      const taskDocRef = doc(db, "tareas", task.id);
      try {
        await deleteDoc(taskDocRef);
      } catch (error) {
        console.error("Error al eliminar tarea:", error);
      }
    }
  };
  // --- FIN DE LA LÓGICA ---

  return (
    <>
      <div className="task-item">
        <strong>{task.title}</strong>
        <p>{task.description}</p>
        <small>Prioridad: {task.priority}</small>
        <small>Fecha: {task.dueDate}</small>
        <hr/>
        
        <div className="task-item-footer">
          <div className="task-item-buttons-move">
            {task.status !== "pendiente" && (
              <button onClick={() => handleStatusChange("pendiente")}>← Pendiente</button>
            )}
            {task.status !== "en_progreso" && (
              <button onClick={() => handleStatusChange("en_progreso")}>{task.status === 'completada' ? '←' : '→'} En Progreso</button>
            )}
            {task.status !== "completada" && (
              <button onClick={() => handleStatusChange("completada")}>Completada →</button>
            )}
          </div>

          <div className="task-item-buttons-action">
            <button onClick={() => setIsEditing(true)} className="btn-link">
              Editar
            </button>
            <button onClick={handleDelete} className="btn-danger-link">
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {isEditing && (
        <EditModal 
          task={task} 
          onClose={() => setIsEditing(false)} 
        />
      )}
    </>
  );
}

export default TaskItem;