const API_URL = 'http://localhost:5001/api/todos';

export const todoService = {
    getAllTodos: async () => {
        try {
            console.log('📞 Obteniendo tareas desde la API...');

            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error (`Error HTTP: ${response.status}`)
            }
            const data = await response.json();
            console.log('✅ Tareas obtenidas: ${data.length} ', data);
            return data;
        } catch (error) {
            console.error('❌ Error al obtener tareas:', error);
            throw error;
        }
    },

    // Crear nueva tarea
    createTodo: async (task) => {
        try {
            console.log('📞 Creando tarea:', task);
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: task }),
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
            
            const data = await response.json();
            console.log('✅ Tarea creada:', data);
            return data;
        } catch (error) {
            console.error('❌ Error al crear tarea:', error);
            throw error;
        }
    },

    // Actualizar tarea (para marcar como completada)
    updateTodo: async (id, updatedData) => {
        try {
            console.log(`📞 Actualizando tarea ${id}:`, updatedData);
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
            
            const data = await response.json();
            console.log('✅ Tarea actualizada:', data);
            return data;
        } catch (error) {
            console.error('❌ Error al actualizar tarea:', error);
            throw error;
        }
    },

    // Eliminar tarea
    deleteTodo: async (id) => {
        try {
            console.log(`📞 Eliminando tarea ${id}`);
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
            
            console.log(`✅ Tarea ${id} eliminada`);
            return true;
        } catch (error) {
            console.error('❌ Error al eliminar tarea:', error);
            throw error;
        }
    },
}

