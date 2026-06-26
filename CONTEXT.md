# Contexto del Proyecto: Servidor de Gestión de Tareas (NestJS + GraphQL + AOP + GitFlow)

Este repositorio contiene la implementación de una práctica universitaria enfocada en construir una API GraphQL para la gestión de tareas de proyectos de desarrollo de software.

## Integrantes / Autor
- Oliver (Oliweb19)

## Objetivos Evaluados
1. **NestJS & GraphQL**: Crear un servidor que exponga una API GraphQL con resolvers y operaciones CRUD completas para tareas.
2. **Programación Orientada a Aspectos (AOP)**: Implementar logs en el servidor interceptando las llamadas de GraphQL sin mezclar la lógica de logging con la lógica de negocio.
3. **Clean Code**: Mantener código legible, funciones pequeñas, buena nomenclatura y separación de responsabilidades.
4. **Documentación JSDoc**: Documentar de forma estándar clases, métodos e interfaces.
5. **GitFlow**: Seguir un flujo de trabajo estructurado de ramas y commits ordenados.

---

## Estructura de Datos de una Tarea (Task)
Cada tarea consta de los siguientes campos mínimos:
- `id` (Identificador único, ID/UUID)
- `title` (Título de la tarea)
- `description` (Descripción detallada)
- `status` (Estado actual: `Backlog`, `To Do`, `In Progress`, `Done`)
- `tags` (Arreglo dinámico de strings para etiquetas)
- `createdAt` (Fecha de creación)
- `assignedUser` (Usuario asignado)
- `projectName` (Proyecto al que pertenece la tarea)

---

## Flujo de GitFlow y Commits Propuestos

A continuación se detalla el progreso planeado. Cada paso requiere del visto bueno del usuario antes de continuar:

- [x] **Configurar GitFlow e Inicializar Rama `develop`**
  - *Estado*: Completado
  - *Commit*: `docs: agregar archivo de contexto y configurar rama develop`
- [x] **Paso 1: Configurar Servidor NestJS + GraphQL**
  - *Rama*: `feature/setup-nestjs`
  - *Estado*: Completado
  - *Commit*: `feat: inicializar servidor NestJS con GraphQL y resolver de prueba`
- [x] **Paso 2: Tipos, Modelos y DTOs de Tareas**
  - *Rama*: `feature/task-crud`
  - *Estado*: Completado
  - *Commit*: `feat: definir esquemas GraphQL, DTOs y tipos para Tareas`
- [x] **Paso 3: Resolver y Servicio de Tareas (CRUD en memoria)**
  - *Rama*: `feature/task-crud`
  - *Estado*: Completado
  - *Commit*: `feat: implementar CRUD de tareas y documentacion JSDoc`
- [/] **Paso 4: Implementar Logs con AOP (NestJS Interceptor)**
  - *Rama*: `feature/aop-logging`
  - *Estado*: En progreso
  - *Commit*: `feat: implementar interceptor de logs usando AOP (NestJS Interceptors)`
- [ ] **Paso 5: Clean Code, Pruebas y Cierre de Rama**
  - *Rama*: `develop` (después de mergear features)
  - *Commit*: `refactor: aplicar principios clean code y validar funcionamiento de la API`
