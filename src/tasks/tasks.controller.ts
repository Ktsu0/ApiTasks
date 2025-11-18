// src/tasks/tasks.controller.ts
import {
  Get,
  Body,
  Patch,
  Request,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getTasks(@Request() req) {
    const userCargo = req.user.cargo;
    const tasks = this.tasksService.getTasksForCargo(userCargo);
    return { tasks };
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateTask(@Request() req, @Body() body: { title: string; done: boolean }) {
    const userCargo = req.user.cargo;
    const updatedTask = this.tasksService.updateTaskStatus(
      body.title,
      userCargo,
      body.done,
    );
    return { task: updatedTask };
  }
}
