import React, { useState } from 'react'
import { TodoForm } from './TodoForm'
import { EditTodoForm } from './EditTodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
uuidv4();

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}]);
  }

  const toggleComplete = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const deleteTodo = id => {
    setTodos(
      todos.filter(todo => todo.id !== id)
    )
  }
  const editTodo = id => {
    setTodos (
      todos.map(todo =>
        todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo
      )
    )
  }
  const editTask = (task, id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? {...todo, task: task, isEditing: !todo.isEditing} : todo
      )
    )
  }
  return (
    <div className="todo-wrapper">
      <h1>To Do List</h1>
      <TodoForm addTodo={addTodo}/>
      {todos.map((todo) => (
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={todo.id}/>
        ) : (
          <Todo task={todo} key={todo.id}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
        )
      ))}
    </div>
  )
}
