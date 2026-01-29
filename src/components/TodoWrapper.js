import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { EditTodoForm } from './EditTodoForm';
import { Todo } from './Todo';
import { todoService } from '../services/todoService';

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar tareas al iniciar
  useEffect(() => {
    fetchTodos();
  }, []);

  // Función para obtener tareas desde la API
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoService.getAllTodos();
      
      // Adaptar datos de la API a nuestro formato
      const adaptedTodos = data.map(todo => ({
        id: todo.id,
        task: todo.task,
        completed: todo.isCompleted === 1,
        isEditing: false
      }));
      
      setTodos(adaptedTodos);
    } catch (error) {
      console.error('Error cargando tareas:', error);
      // En caso de error, usar datos locales
      setTodos([
        { id: 1, task: 'Ejemplo: Comprar pan', completed: false, isEditing: false },
        { id: 2, task: 'Ejemplo: Aprender React', completed: true, isEditing: false }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Agregar nueva tarea
  const addTodo = async (todo) => {
    try {
      // Enviar a la API
      const newTodo = await todoService.createTodo(todo);
      
      // Agregar al estado local
      setTodos([...todos, {
        id: newTodo.id,
        task: newTodo.task,
        completed: newTodo.isCompleted === 1,
        isEditing: false
      }]);
    } catch (error) {
      console.error('Error agregando tarea:', error);
      // Fallback: agregar localmente sin ID único temporal
      const tempId = Date.now(); // ID temporal
      setTodos([...todos, {
        id: tempId,
        task: todo,
        completed: false,
        isEditing: false
      }]);
    }
  };

  // Marcar como completada/incompleta
  const toggleComplete = async (id) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        // Enviar a la API
        const newCompleted = !todo.completed;
        await todoService.updateTodo(id, {
          isCompleted: newCompleted ? 1 : 0
        });
        
        // Actualizar estado local
        setTodos(
          todos.map(todo =>
            todo.id === id ? { ...todo, completed: newCompleted } : todo
          )
        );
      }
    } catch (error) {
      console.error('Error actualizando tarea:', error);
      // Fallback: actualizar localmente
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    }
  };

  // Eliminar tarea
  const deleteTodo = async (id) => {
    try {
      // Enviar a la API
      await todoService.deleteTodo(id);
      
      // Actualizar estado local
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error eliminando tarea:', error);
      // Fallback: eliminar localmente
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  // Activar modo edición
  const editTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Guardar cambios de edición
  const editTask = async (task, id) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (todo && task !== todo.task) {
        // Enviar a la API solo si el texto cambió
        await todoService.updateTodo(id, {
          task: task
        });
      }
      
      // Actualizar estado local
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, task: task, isEditing: false } : todo
        )
      );
    } catch (error) {
      console.error('Error editando tarea:', error);
      // Fallback: editar localmente
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, task: task, isEditing: false } : todo
        )
      );
    }
  };

  // Mostrar carga mientras se obtienen datos
  if (loading) {
    return (
      <div className="todo-wrapper">
        <h1 className="todo-title">✨ To Do List ✨</h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
          Cargando tareas...
        </p>
      </div>
    );
  }

  return (
    <div className="todo-wrapper">
      <h1 className="todo-title">✨ To Do List ✨</h1>
      <TodoForm addTodo={addTodo} />
      
      {todos.length === 0 ? (
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
          No hay tareas. ¡Agrega una nueva!
        </p>
      ) : (
        todos.map((todo) => (
          todo.isEditing ? (
            <EditTodoForm 
              editTodo={editTask} 
              task={todo} 
              key={todo.id}
            />
          ) : (
            <Todo 
              task={todo} 
              key={todo.id}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          )
        ))
      )}
    </div>
  );
};