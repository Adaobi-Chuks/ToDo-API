import Task from '../models/task.model';
import { ITask, ITaskOpt } from '../interfaces/task.interface';

class TaskService {
    async create(task: ITaskOpt) {
    const _task = await Task.create(task);
    return _task;
    }

    async findOne(filter: any) {
        const task = await Task.findOne({ where: filter });
        return task;
    }

    async findAll(filter: any = {}) {
        const tasks = await Task.findAll({ where: filter });
        return tasks;
    }

    async update(id: number, task: Partial<ITask>) {
        return await Task.update(task, {
        where: { id },
        returning: true,
        });
    }

    async delete(id: number) {
        const rowsCount = await Task.destroy({ where: { id } });
        return rowsCount;
    }
}

export default new TaskService();