import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from "./dto/create-task.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "./task.entity";
import {TaskStatus} from "./task-status.enum";
import {TaskRepository} from "./task.repository";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}


    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }
    //
    // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks();
    //     if (status) {
    //         tasks = tasks.filter(task=>task.status===status);
    //     }
    //     if (search) {
    //         tasks = tasks.filter(task => {
    //             const keyword = search.toLowerCase();
    //             return task.title.toLowerCase().includes(keyword)
    //                 || task.description.toLowerCase().includes(keyword);
    //         });
    //     }
    //     return tasks;
    // }


    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found!`);
        }

        return found;
    }


    //
    // deleteTask(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task=>task.id!==found.id);
    // }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();
        return task;
    }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };
    //     this.tasks.push(task);
    //     return task;
    // }
    //
    // updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
    //     const { tasks } = this;
    //     const taskIndex = tasks.findIndex(task=>task.id===id);
    //     const updatedTask = {...tasks[taskIndex], ...updateTaskDto};
    //
    //     this.tasks = [
    //         ...tasks.slice(0, taskIndex),
    //         updatedTask,
    //         ...tasks.slice(taskIndex + 1),
    //     ];
    //
    //     return updatedTask;
    // }
    //
    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
