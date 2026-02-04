import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({task, toggleComplete, deleteTodo, editTodo}) => {
  return (
    <div className={`Todo ${task.isCompleted ? 'completed' : ''}`}>
      <p onClick={() => toggleComplete(task.id)}>{task.task}</p>
      <div className='Todo-icons'>
        <div className='icon-btn edit-btn' onClick={(e) => {
          e.stopPropagation();
          editTodo(task.id);
        }}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>
        <div className='icon-btn delete-btn' onClick={(e) => {
          e.stopPropagation();
          deleteTodo(task.id);
        }}>
          <FontAwesomeIcon icon={faTrash} /> 
        </div>
      </div>
    </div>
  )
}