// src/components/EditModal.jsx
import React, { useState, useEffect } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

// ¡Ya no necesitamos los objetos de estilo! Los borramos.

function EditModal({ task, onClose }) {
  const [formData, setFormData] = useState({
    title: '', description: '', dueDate: '', priority: 'media',
  });

  // ... (Las funciones useEffect, handleChange, y handleSubmit se quedan IGUAL)
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "tareas", task.id);
    try {
      await updateDoc(taskDocRef, formData);
      onClose();
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };
  // ... (Fin de las funciones)

  if (!task) return null;

  return (
    // Usamos los nuevos className del CSS
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> 
        
        <h2>Editar Tarea</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Fecha Límite:</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              style={{ marginRight: 15, width: 'auto' }} // Dejamos este
            />
            
            <label style={{ marginLeft: 15, marginRight: 5 }}>Prioridad:</label>
            <select name="priority" value={formData.priority} onChange={handleChange}>
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>
          
          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Guardar Cambios
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default EditModal;