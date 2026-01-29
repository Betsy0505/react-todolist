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
        try{
            const { task } = req.body;
            if ( !task || task.trim() === '' ) {
                return res.status(400).json({ error: 'La tarea es requerida' });
            }

            const stmt = db.prepare('INSERT INTO todos (task, isCompleted, isEditing) VALUES (?, ?, ?)'); 
            stmt.run(task, false, false);
            const todos = db.prepare('SELECT * FROM todos order by id').all();
            res.json(todos);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    });

    // PUT /api/todos/:id
    app.put('/api/todos/:id', (req, res) => {
        try{
            const { task } = req.body;
            const { id } = req.params;
            if ( !task || task.trim() === '' ) {
                return res.status(400).json({ error: 'La tarea es requerida' });
            }

            const stmt = db.prepare('UPDATE todos SET task = ?, isCompleted = ?, isEditing = ? WHERE id = ?');
            stmt.run(task, false, false, id);
            const todos = db.prepare('SELECT * FROM todos order by id').all();
            res.json(todos);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }); 

    // DELETE /api/todos/:id
    app.delete('/api/todos/:id', (req, res) => {
        try{
            const { id } = req.params;
            const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
            stmt.run(id);
            const todos = db.prepare('SELECT * FROM todos order by id').all();
            res.json(todos);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });