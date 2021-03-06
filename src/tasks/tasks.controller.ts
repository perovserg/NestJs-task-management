import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { TasksService } from "./tasks.service";

import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/updateTask.dto";
import {GetTasksFilterDto} from "./dto/getTasksFilter.dto";
import {TaskStatusValidationPipe} from "./pipes/task.statusValidation.pipe";
import {Task} from "./task.entity";

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    //     if (Object.keys(filterDto).length) {
    //         return this.tasksService.getTasksWithFilter(filterDto);
    //     }
    //     return this.tasksService.getAllTasks();
    // }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    // @Delete('/:id')
    // deleteTask(@Param('id') id: string): void {
    //     this.tasksService.deleteTask(id);
    // }
    //
    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id: string,
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    // ): Task {
    //     return this.tasksService.updateTaskStatus(id, status);
    // }
    //
    // @Patch('/:id')
    // updateTask(
    //     @Param('id') id: string,
    //     @Body() updateTaskDto: UpdateTaskDto,
    // ): Task {
    //     return this.tasksService.updateTask(id, updateTaskDto);
    // }
    //
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }
}
