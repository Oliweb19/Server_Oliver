import { Field, InputType } from '@nestjs/graphql';

/**
 * Parámetros de entrada requeridos para crear una tarea.
 */
@InputType({ description: 'Datos necesarios para crear una nueva tarea.' })
export class CreateTaskInput {
  /**
   * Título de la tarea.
   */
  @Field({ description: 'Título de la tarea' })
  title!: string;

  /**
   * Descripción de la tarea.
   */
  @Field({ description: 'Descripción de la tarea' })
  description!: string;

  /**
   * Etiquetas dinámicas iniciales de la tarea (por defecto vacío).
   */
  @Field(() => [String], { description: 'Etiquetas o tags de la tarea', defaultValue: [] })
  tags!: string[];

  /**
   * Nombre del usuario asignado.
   */
  @Field({ description: 'Nombre del usuario responsable' })
  assignedUser!: string;

  /**
   * Proyecto asociado a la tarea.
   */
  @Field({ description: 'Nombre del proyecto al que pertenece la tarea' })
  projectName!: string;
}
