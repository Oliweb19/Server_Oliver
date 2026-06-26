import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TaskStatus } from './task-status.enum';

/**
 * Entidad/Modelo que representa una Tarea de desarrollo de software en GraphQL.
 */
@ObjectType({ description: 'Representa una tarea de desarrollo de software.' })
export class Task {
  /**
   * Identificador único de la tarea.
   */
  @Field(() => ID, { description: 'Identificador único de la tarea (UUID)' })
  id!: string;

  /**
   * Título descriptivo de la tarea.
   */
  @Field({ description: 'Título de la tarea' })
  title!: string;

  /**
   * Descripción detallada del trabajo a realizar.
   */
  @Field({ description: 'Descripción de la tarea' })
  description!: string;

  /**
   * Estado actual en el tablero (Backlog, To Do, In Progress, Done).
   */
  @Field(() => TaskStatus, { description: 'Estado actual de la tarea' })
  status!: TaskStatus;

  /**
   * Etiquetas dinámicas asociadas a la tarea.
   */
  @Field(() => [String], { description: 'Etiquetas o tags de la tarea' })
  tags!: string[];

  /**
   * Fecha y hora en la que la tarea fue creada.
   */
  @Field({ description: 'Fecha de creación de la tarea' })
  createdAt!: Date;

  /**
   * Usuario asignado a la tarea.
   */
  @Field({ description: 'Nombre del usuario responsable' })
  assignedUser!: string;

  /**
   * Proyecto al que pertenece la tarea.
   */
  @Field({ description: 'Nombre del proyecto al que pertenece la tarea' })
  projectName!: string;
}
