// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskBD } from './model/tasks.model';
import { tasks } from './model/tasksBD';

@Injectable()
export class TasksService {
  // Retorna todas as tarefas de um cargo específico
  getTasksForCargo(cargo: string): TaskBD[] {
    return tasks.filter((task) => task.cargo === cargo);
  }

  // Atualiza o status "done" de uma tarefa
  updateTaskStatus(title: string, cargo: string, done: boolean) {
    const task = tasks.find((t) => t.title === title && t.cargo === cargo);

    if (!task) {
      throw new NotFoundException(
        `Tarefa "${title}" para o cargo "${cargo}" não encontrada.`,
      );
    }

    task.done = done;
    return task;
  }
}
