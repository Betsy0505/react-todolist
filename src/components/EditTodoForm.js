import React, {useState} from 'react'

export const EditTodoForm = ({editTodo, task}) => {
  const [value, setValue] = useState(task.task)

   const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar que el input no esté vacío
    if (value.trim() === "") {
      return;
    }
    
    editTodo(value, task.id);
    setValue("");
   }
  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
        <input type="text" className='todo-input' value={value} placeholder='Update task'  onChange={(e)=> setValue(e.target.value)}
        />
        <button type='submit' className='todo-btn'>Update Task</button>
    </form>
  )
}

export default EditTodoForm