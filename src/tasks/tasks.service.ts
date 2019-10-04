import {Injectable} from '@nestjs/common';
import * as uuid from 'uuid/v1';
import {Task, TaskStatus} from "./task.model";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/updateTask.dto";
import {GetTasksFilterDto} from "./dto/getTasksFilter.dto";

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();
        if (status) {
            tasks = tasks.filter(task=>task.status===status);
        }
        if (search) {
            tasks = tasks.filter(task => {
                const keyword = search.toLowerCase();
                return task.title.toLowerCase().includes(keyword)
                    || task.description.toLowerCase().includes(keyword);
            });
        }
        return tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task=>task.id===id);
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task=>task.id!==id);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
        const { tasks } = this;
        const taskIndex = tasks.findIndex(task=>task.id===id);
        const updatedTask = {...tasks[taskIndex], ...updateTaskDto};

        this.tasks = [
            ...tasks.slice(0, taskIndex),
            updatedTask,
            ...tasks.slice(taskIndex + 1),
        ];

        return updatedTask;
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
