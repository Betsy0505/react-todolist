import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);

  useEffect(() => {
    setValue(task.task);
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      editTodo(value, task.id);
      setValue("");
    }
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="Editar tarea"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn">
        <FontAwesomeIcon icon={faFloppyDisk} className="btn-icon" />
        Update task
      </button>
    </form>
  );
};