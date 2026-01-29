# 📝 To Do List - React JS + Node.js API

Una aplicación completa **To Do List** con **frontend en React** y **backend en Node.js**, que permite gestionar tareas de manera persistente con una base de datos SQLite.

## 🚀 Características

### Frontend (React)
- ➕ Agregar nuevas tareas
- ✏️ Editar tareas existentes
- ✅ Marcar tareas como completadas
- 🗑️ Eliminar tareas
- 🔄 Renderizado dinámico con `useState`
- 🌐 Conexión a API RESTful
- 🎨 Interfaz responsiva y moderna

### Backend (Node.js + Express)
- 🔐 API REST completa
- 💾 Persistencia de datos con SQLite
- 🛡️ CORS habilitado
- 📊 Operaciones CRUD (Create, Read, Update, Delete)
- ⚡ Respuestas JSON estandarizadas

## 🛠️ Tecnologías utilizadas

### Frontend
- **React JS 18**
- **JavaScript (ES6+)**
- **CSS3** (Estilos personalizados)
- **React Hooks** (`useState`, `useEffect`)
- **Axios** (Para llamadas HTTP)

### Backend
- **Node.js** + **Express.js**
- **SQLite3** (Base de datos ligera)
- **CORS** (Middleware para seguridad)
- **Nodemon** (Recarga automática en desarrollo)

## 📊 Endpoints disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/todos` | Obtener todas las tareas |
| `POST` | `/api/todos` | Crear nueva tarea |
| `PUT` | `/api/todos/:id` | Actualizar tarea existente |
| `DELETE` | `/api/todos/:id` | Eliminar tarea |

## ⚡ Instalación y ejecución

#### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/react-todolist.git
cd react-todolist
```
#### 2. Instalar dependencias del frontend
```bash
npm install
```
#### 3. Instalar dependencias del backend
```bash
cd backend
npm install
cd ..
```
#### 4. Ejecutar en modo desarrollo (dos terminales)
Terminal 1 - Backend:
```bash
cd backend
npm run dev
```
📡 Servidor en: http://localhost:5000

Terminal 2 - Frontend:
```bash
npm start
```
🌐 Aplicación en: http://localhost:3000

📸 Vista previa
<img width="807" height="552" alt="image" src="https://github.com/user-attachments/assets/36cccdfb-9291-4bdd-aa80-7ce846004ad6" />

✨ Autor
Betsy Velázquez - Desarrolladora Full Stack

