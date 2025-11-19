import {
  Get,
  Put,
  Param,
  Body,
  Request,
  UseGuards,
  Controller,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // GET /tasks
  @UseGuards(JwtAuthGuard)
  @Get()
  getTasks(@Request() req) {
    const userCargo = req.user.cargo;

    console.log(
      `[TasksController] Buscando tarefas para o cargo: ${userCargo}`,
    );

    const tasks = this.tasksService.getTasksForCargo(userCargo);

    const mappedTasks = tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      feito: task.done,
      cargo: task.cargo,
    }));

    console.log('Tarefas retornadas:', mappedTasks);

    return mappedTasks; // Retorna direto o array
  }

  // PUT /tasks/:id
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateTask(
    @Param('id') id: string,
    @Body('feito') feito: boolean,
    @Request() req,
  ) {
    const userCargo = req.user.cargo;
    const taskId = parseInt(id, 10);

    try {
      const updatedTask = this.tasksService.updateTaskStatus(
        taskId,
        userCargo,
        feito,
      );
      return { ...updatedTask, feito: updatedTask.done };
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
