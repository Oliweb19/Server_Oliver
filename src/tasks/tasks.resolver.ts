import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './models/task.model';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

/**
 * Resolver de GraphQL que maneja las consultas y mutaciones para la gestión de tareas.
 */
@Resolver(() => Task)
export class TasksResolver {
  /**
   * Inicializa el resolver inyectando el servicio de tareas.
   * @param tasksService - Instancia del servicio de gestión de tareas.
   */
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Consulta GraphQL para obtener la lista completa de tareas.
   * @returns Un arreglo con todas las tareas registradas en el sistema.
   */
  @Query(() => [Task], { name: 'tasks', description: 'Obtiene todas las tareas registradas.' })
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  /**
   * Consulta GraphQL para buscar una tarea por su ID único.
   * @param id - Identificador de tipo ID/UUID de la tarea.
   * @returns La tarea si se encuentra.
   */
  @Query(() => Task, { name: 'task', description: 'Busca una tarea específica por su ID.' })
  findOne(
    @Args('id', { type: () => ID, description: 'ID único de la tarea a buscar' })
    id: string,
  ): Task {
    return this.tasksService.findOne(id);
  }

  /**
   * Mutación GraphQL para registrar una nueva tarea.
   * @param createTaskInput - DTO que contiene los detalles de la tarea a crear.
   * @returns La tarea recién creada.
   */
  @Mutation(() => Task, { name: 'createTask', description: 'Registra una nueva tarea en el sistema.' })
  createTask(
    @Args('createTaskInput', { description: 'Datos necesarios para la nueva tarea' })
    createTaskInput: CreateTaskInput,
  ): Task {
    return this.tasksService.create(createTaskInput);
  }

  /**
   * Mutación GraphQL para modificar una tarea existente.
   * @param updateTaskInput - DTO que contiene el ID de la tarea y los campos modificables.
   * @returns La tarea actualizada.
   */
  @Mutation(() => Task, { name: 'updateTask', description: 'Actualiza los atributos de una tarea existente.' })
  updateTask(
    @Args('updateTaskInput', { description: 'Datos modificables de la tarea con su ID' })
    updateTaskInput: UpdateTaskInput,
  ): Task {
    return this.tasksService.update(updateTaskInput);
  }

  /**
   * Mutación GraphQL para eliminar una tarea.
   * @param id - Identificador de la tarea que se desea eliminar.
   * @returns Un valor booleano indicando si la operación fue exitosa.
   */
  @Mutation(() => Boolean, { name: 'removeTask', description: 'Elimina de forma permanente una tarea.' })
  removeTask(
    @Args('id', { type: () => ID, description: 'ID de la tarea que se desea remover' })
    id: string,
  ): boolean {
    return this.tasksService.remove(id);
  }
}
