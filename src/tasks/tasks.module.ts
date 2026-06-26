import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';

/**
 * Módulo de Tareas.
 * Agrupa y expone el resolver y servicio de tareas de desarrollo.
 */
@Module({
  providers: [TasksResolver, TasksService],
  exports: [TasksService], // Exportamos por si otros módulos requieren la lógica de tareas
})
export class TasksModule {}
