import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({task}) => {
  return (
    <div className='Todo'>
      <p>{task.task}</p>
      <div className='Todo-icons'>
        <div className='icon-btn edit-btn'>
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>
        <div className='icon-btn delete-btn'>
          <FontAwesomeIcon icon={faTrash} /> 
        </div>
      </div>
    </div>
  )
}