import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Todo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className={`Todo ${task.completed ? 'completed' : ''}`}>
      <p onClick={() => toggleComplete(task.id)}>
        {task.task}
      </p>
      <div className="Todo-icons">
        <button 
          className="icon-btn edit-btn" 
          onClick={() => editTodo(task.id)}
          aria-label="Editar"
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button 
          className="icon-btn delete-btn" 
          onClick={() => deleteTodo(task.id)}
          aria-label="Eliminar"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};