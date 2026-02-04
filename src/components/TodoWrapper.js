import React, { useState, useEffect } from 'react'
import { TodoForm } from './TodoForm'
import { EditTodoForm } from './EditTodoForm'
import { Todo } from './Todo';
import axios from 'axios'; 

// URL de conexion a la API
const API_URL = `${process.env.REACT_APP_API_URL}/api/todos`;

export const TodoWrapper = () => {
 
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      // Al venir de la DB, las tareas no tienen "isEditing", lo agregamos localmente
      const todosWithEditState = res.data.map(todo => ({
        ...todo,
        isEditing: false
      }));
      setTodos(todosWithEditState);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    }
  };

useEffect(() => {
    fetchTodos();
  }, []);

// Crear tareas (Create)
const addTodo = async (todoText) => {
    try {
      const newTodo = { task: todoText, isCompleted: false };
      const res = await axios.post(API_URL, newTodo);
      // Agregamos la respuesta de la API (que ya trae el ID de MariaDB) al estado
      setTodos([...todos, { ...res.data, isEditing: false }]);
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

// Marcar completada (Update)
const toggleComplete = async (id) => {
  const todoToToggle = todos.find(todo => todo.id === id);
    try {
      const updatedTodo = {
        ...todoToToggle,
        isCompleted: !todoToToggle.isCompleted
      };
      await axios.put(`${API_URL}/${id}`, updatedTodo);

      setTodos(todos.map((todo) =>
      todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo));
    } catch (error) {
      console.error("Error al marcar tarea como completada:", error);
    }
  };

  // Eliminar tareas (Delete)
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  // Editar tareas (Update)
  const editTodo = (id) => {
    setTodos(todos.map((todo) =>
    todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo));
  };

  const editTask = async(taskText, id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    try{
      const updatedTodo = {
        ...todoToEdit,
        task: taskText,
        isEditing: false
      };
      await axios.put(`${API_URL}/${id}`, updatedTodo);

      setTodos(todos.map((todo) =>
      todo.id === id ? {...todo, task: taskText, isEditing: false} : todo));
    } catch (error) {
      console.error("Error al editar tarea:", error);
    }
  };

return (
    <div className="todo-wrapper">
      <h1>To Do List</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
        ) : (
          <Todo
            task={todo}
            key={todo.id}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};