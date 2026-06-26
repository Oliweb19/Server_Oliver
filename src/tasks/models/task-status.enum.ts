import { registerEnumType } from '@nestjs/graphql';

/**
 * Estados permitidos para una tarea en el flujo de desarrollo.
 */
export enum TaskStatus {
  BACKLOG = 'Backlog',
  TO_DO = 'To Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

// Registrar el enum en el esquema de GraphQL
registerEnumType(TaskStatus, {
  name: 'TaskStatus',
  description: 'Los estados disponibles para una tarea de desarrollo.',
});
