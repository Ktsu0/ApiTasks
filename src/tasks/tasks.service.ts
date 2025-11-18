// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskBD } from './model/tasks.model';
import { tasks } from './model/tasksBD';

@Injectable()
export class TasksService {
  // Retorna todas as tarefas de um cargo específico
  getTasksForCargo(cargo: string): TaskBD[] {
    // Converte para lowercase para evitar problemas de case
    return tasks.filter(
      (task) => task.cargo.toLowerCase() === cargo.toLowerCase(),
    );
  }

  // Atualiza o status "done" de uma tarefa pelo ID e cargo
  updateTaskStatus(id: number, cargo: string, done: boolean): TaskBD {
    const task = tasks.find(
      (t) => t.id === id && t.cargo.toLowerCase() === cargo.toLowerCase(),
    );

    if (!task) {
      throw new NotFoundException(
        `Tarefa com ID "${id}" para o cargo "${cargo}" não encontrada.`,
      );
    }

    task.done = done;
    return task;
  }
}
