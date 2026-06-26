import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Task } from './models/task.model';
import { TaskStatus } from './models/task-status.enum';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

/**
 * Servicio encargado de gestionar el ciclo de vida de las tareas en memoria.
 * Proporciona operaciones CRUD completas y validaciones básicas.
 */
@Injectable()
export class TasksService {
  /**
   * Almacenamiento en memoria para las tareas creadas.
   */
  private tasks: Task[] = [];

  /**
   * Obtiene la lista completa de tareas registradas.
   * @returns Un arreglo con todas las tareas.
   */
  findAll(): Task[] {
    return this.tasks;
  }

  /**
   * Busca una tarea específica por su identificador único.
   * @param id - Identificador único (UUID) de la tarea a buscar.
   * @returns La tarea encontrada.
   * @throws NotFoundException - Si la tarea no existe en memoria.
   */
  findOne(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Tarea con ID "${id}" no encontrada.`);
    }
    return task;
  }

  /**
   * Crea una nueva tarea y la añade al almacenamiento en memoria.
   * @param createTaskInput - Objeto con los datos de entrada para la nueva tarea.
   * @returns La tarea recién creada con su ID auto-generado y fecha de creación actual.
   */
  create(createTaskInput: CreateTaskInput): Task {
    const newTask: Task = {
      id: randomUUID(),
      title: createTaskInput.title,
      description: createTaskInput.description,
      status: TaskStatus.BACKLOG, // Toda tarea inicia en Backlog
      tags: createTaskInput.tags ?? [],
      createdAt: new Date(),
      assignedUser: createTaskInput.assignedUser,
      projectName: createTaskInput.projectName,
    };
    
    this.tasks.push(newTask);
    return newTask;
  }

  /**
   * Actualiza una tarea existente de forma parcial según los datos proporcionados.
   * @param updateTaskInput - Objeto con los campos a modificar y el ID de la tarea.
   * @returns La tarea actualizada con los nuevos valores.
   * @throws NotFoundException - Si la tarea con el ID especificado no existe.
   */
  update(updateTaskInput: UpdateTaskInput): Task {
    // Buscar la tarea; si no existe, findOne arroja una NotFoundException
    const task = this.findOne(updateTaskInput.id);
    
    // Aplicar las actualizaciones correspondientes si se especificaron
    if (updateTaskInput.title !== undefined) {
      task.title = updateTaskInput.title;
    }
    if (updateTaskInput.description !== undefined) {
      task.description = updateTaskInput.description;
    }
    if (updateTaskInput.status !== undefined) {
      task.status = updateTaskInput.status;
    }
    if (updateTaskInput.tags !== undefined) {
      task.tags = updateTaskInput.tags;
    }
    if (updateTaskInput.assignedUser !== undefined) {
      task.assignedUser = updateTaskInput.assignedUser;
    }
    if (updateTaskInput.projectName !== undefined) {
      task.projectName = updateTaskInput.projectName;
    }

    return task;
  }

  /**
   * Elimina una tarea del almacenamiento en memoria por su ID.
   * @param id - Identificador de la tarea a eliminar.
   * @returns true si la tarea fue eliminada con éxito.
   * @throws NotFoundException - Si no se encuentra la tarea para eliminar.
   */
  remove(id: string): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((t) => t.id !== id);
    
    if (this.tasks.length === initialLength) {
      throw new NotFoundException(`No se pudo eliminar: Tarea con ID "${id}" no encontrada.`);
    }
    
    return true;
  }
}
