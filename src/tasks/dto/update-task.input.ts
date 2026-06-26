import { Field, ID, InputType } from '@nestjs/graphql';
import { TaskStatus } from '../models/task-status.enum';

/**
 * Parámetros de entrada para actualizar una tarea existente.
 * Todos los campos de edición son opcionales.
 */
@InputType({ description: 'Datos necesarios para actualizar una tarea existente.' })
export class UpdateTaskInput {
  /**
   * ID único de la tarea que se va a actualizar.
   */
  @Field(() => ID, { description: 'Identificador único de la tarea a actualizar' })
  id!: string;

  /**
   * Nuevo título de la tarea (opcional).
   */
  @Field({ nullable: true, description: 'Nuevo título de la tarea' })
  title?: string;

  /**
   * Nueva descripción de la tarea (opcional).
   */
  @Field({ nullable: true, description: 'Nueva descripción de la tarea' })
  description?: string;

  /**
   * Nuevo estado en el flujo de desarrollo (opcional).
   */
  @Field(() => TaskStatus, { nullable: true, description: 'Nuevo estado de la tarea' })
  status?: TaskStatus;

  /**
   * Nuevo conjunto de etiquetas (opcional).
   */
  @Field(() => [String], { nullable: true, description: 'Nuevas etiquetas para la tarea' })
  tags?: string[];

  /**
   * Nuevo usuario asignado (opcional).
   */
  @Field({ nullable: true, description: 'Nuevo usuario responsable' })
  assignedUser?: string;

  /**
   * Nuevo proyecto asociado (opcional).
   */
  @Field({ nullable: true, description: 'Nuevo proyecto de la tarea' })
  projectName?: string;
}
