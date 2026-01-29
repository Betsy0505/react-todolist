const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express();
const PORT = 5001;
const db = new Database('todos.db', {verbose: console.log});

db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT NOT NULL,
        isCompleted INTEGER DEFAULT 0,
        isEditing INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    app.use(cors());
    app.use(express.json());

    // GET all todos

    app.get('/api/todos', (req, res) => {
        try{
            const todos = db.prepare('SELECT * FROM todos order by id').all();
            res.json(todos);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    });

    // POST new todo
app.post('/api/todos', (req, res) => {
    console.log('📥 POST /api/todos recibido:', req.body);
    try {
        const { task } = req.body;
        if (!task || task.trim() === '') {
            return res.status(400).json({ error: 'La tarea es requerida' });
        }

        // Usar 0 en lugar de false para SQLite
        const stmt = db.prepare('INSERT INTO todos (task, isCompleted, isEditing) VALUES (?, ?, ?)');
        const result = stmt.run(task.trim(), 0, 0); // <-- Cambiado a 0
        
        // Obtener el nuevo todo insertado
        const newTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(result.lastInsertRowid);
        console.log('✅ Nueva tarea creada:', newTodo);
        
        res.status(201).json(newTodo); // <-- Devolver solo el nuevo todo
    } catch (err) {
        console.error('❌ Error en POST /api/todos:', err);
        res.status(500).json({ error: err.message });
    }
});

    // PUT /api/todos/:id - Para actualizar (marcar como completada o editar)
app.put('/api/todos/:id', (req, res) => {
    console.log(`📥 PUT /api/todos/${req.params.id} recibido:`, req.body);
    try {
        const { id } = req.params;
        const { task, isCompleted } = req.body; // <-- Recibir ambos campos

        // Verificar si existe
        const existingTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
        if (!existingTodo) {
            console.log(`❌ Tarea ${id} no encontrada`);
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        // Actualizar solo los campos proporcionados
        const updateStmt = db.prepare(`
            UPDATE todos 
            SET task = COALESCE(?, task), 
                isCompleted = COALESCE(?, isCompleted),
                updatedAt = CURRENT_TIMESTAMP 
            WHERE id = ?
        `);
        
        // Usar 0/1 para isCompleted
        const isCompletedNum = isCompleted !== undefined ? (isCompleted ? 1 : 0) : undefined;
        updateStmt.run(task, isCompletedNum, id);
        
        // Obtener el todo actualizado
        const updatedTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
        console.log('✅ Tarea actualizada:', updatedTodo);
        
        res.json(updatedTodo);
    } catch (err) {
        console.error(`❌ Error en PUT /api/todos/${req.params.id}:`, err);
        res.status(500).json({ error: err.message });
    }
}); 

    // DELETE /api/todos/:id
app.delete('/api/todos/:id', (req, res) => {
    console.log(`📥 DELETE /api/todos/${req.params.id} recibido`);
    try {
        const { id } = req.params;
        
        // Verificar si existe
        const existingTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
        if (!existingTodo) {
            console.log(`❌ Tarea ${id} no encontrada para eliminar`);
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        
        const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
        stmt.run(id);
        console.log(`✅ Tarea ${id} eliminada`);
        
        res.status(204).send(); // 204 No Content
    } catch (err) {
        console.error(`❌ Error en DELETE /api/todos/${req.params.id}:`, err);
        res.status(500).json({ error: err.message });
    }
});

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });