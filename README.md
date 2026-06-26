# Server Oliver

Servidor GraphQL desarrollado con NestJS para gestionar tareas de forma sencilla y rápida. Este proyecto ofrece una API para crear, consultar, actualizar y eliminar tareas mediante operaciones GraphQL.

## ✨ ¿Qué hace este proyecto?

La aplicación expone un CRUD básico de tareas con los siguientes campos:

- id
- title
- description
- status
- tags
- createdAt
- assignedUser
- projectName

Es ideal como base para aprender GraphQL, NestJS o construir una API más amplia en el futuro.

## 🛠️ Tecnologías utilizadas

- NestJS
- GraphQL
- TypeScript
- ts-node

## ✅ Requisitos

Antes de empezar, asegúrate de tener instalado:

- Node.js
- npm

## 🚀 Instalación

Desde la raíz del proyecto ejecuta:

```bash
npm install
```

## ▶️ Ejecución

Inicia el servidor con:

```bash
npm run start
```

Una vez arrancado, la API estará disponible en:

```text
http://localhost:3000/graphql
```

## 🔎 Cómo probar la API

Puedes abrir la URL anterior en tu navegador o utilizar herramientas como Postman, Insomnia o Apollo Studio.

## 📌 Queries y mutations ejemplos

### 1. Obtener todas las tareas

```graphql
query {
  tasks {
    id
    title
    description
    status
    assignedUser
    projectName
    createdAt
  }
}
```

### 2. Obtener una tarea por ID

```graphql
query GetTask($id: ID!) {
  task(id: $id) {
    id
    title
    description
    status
    assignedUser
    projectName
  }
}
```

Variables:

```json
{
  "id": "<id-de-la-tarea>"
}
```

### 3. Crear una tarea

```graphql
mutation CreateTask {
  createTask(createTaskInput: {
    title: "Nueva tarea"
    description: "Descripción de ejemplo"
    tags: ["backend", "graphql"]
    assignedUser: "Oliver"
    projectName: "Server Oliver"
  }) {
    id
    title
    description
    status
    assignedUser
    projectName
    createdAt
  }
}
```

### 4. Actualizar una tarea

```graphql
mutation UpdateTask {
  updateTask(updateTaskInput: {
    id: "<id-de-la-tarea>"
    title: "Tarea actualizada"
    status: TO_DO
  }) {
    id
    title
    status
  }
}
```

### 5. Eliminar una tarea

```graphql
mutation RemoveTask {
  removeTask(id: "<id-de-la-tarea>")
}
```

## 🧾 Estados disponibles

```text
BACKLOG
TO_DO
IN_PROGRESS
DONE
```

## ℹ️ Notas importantes

- Los datos se almacenan en memoria mientras el servidor está en ejecución.
- Si reinicias el servidor, las tareas creadas se perderán.
- Este proyecto funciona como una base sencilla para practicar GraphQL y NestJS.
