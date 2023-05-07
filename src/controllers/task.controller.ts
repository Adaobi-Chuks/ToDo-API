import { Request, Response } from 'express';
import TaskService from '../services/task.service';
import { MESSAGES } from "../configs/constants.config";
import AuthRequest from '../interfaces/auth.interface';
// const {
//     CREATED,
//     DUPLICATE_EMAIL,
//     INVALID_USERNAME,
//     INVALID_PASSWORD,
//     LOGGEDIN
// } = MESSAGES.TASK

export default class TaskController {
    async create(req: Request, res: Response) {
        const { title } = req.body;
        const UserId = (req as AuthRequest).user.id;
        console.log(UserId)
        const task = await TaskService.create({title, UserId});
        return res.status(201)
        .send({
            success: true,
            message: "Task created successfully",
            createdTask: task
        });  
    }

    async getAll(req: Request, res: Response) {
        const UserId = (req as AuthRequest).user.id;
        const tasks = await TaskService.findAll({UserId});
        return res.status(200)
        .send({
            success: true,
            message: "Tasks fetched successfully",
            tasks
        });
    }

    async getOne(req: Request, res: Response) {
        const taskId = parseInt(req.params.id);
        const UserId = (req as AuthRequest).user.id;
        const task = await TaskService.findOne({id: taskId, UserId});
        if (!task) {
            return res.status(404)
            .send({
                success: false,
                message: "Task not found"
            });
        } else {
            return res.status(200)
            .send({
                success: true,
                message: "Task fetched successfully",
                task
            });
        }
    }

    async update(req: Request, res: Response) {
        const taskId = parseInt(req.params.id);
        const UserId = (req as AuthRequest).user.id;
        const task = await TaskService.findOne({id: taskId, UserId});
        if (!task) {
            return res.status(404)
            .send({
                success: false,
                message: "Task not found"
            });
        }
        const updatedTask = await TaskService.update(taskId, req.body);
        const _task = await TaskService.findOne({id: taskId, UserId});
        return res.status(200)
            .send({
                success: true,
                message: "Tasks updated successfully",
                _task
            });
    }

    async deletee(req: Request, res: Response) {
        const taskId = parseInt(req.params.id);
        const UserId = (req as AuthRequest).user.id;
        const task = await TaskService.findOne({id: taskId, UserId});
        if (!task) {
            return res.status(404)
                .send({
                    success: false,
                    message: "Task not found"
                });
            }
        const result = await TaskService.delete(taskId);
        return res.status(200)
            .send({
                success: true,
                message: "Task deleted successfully",
            });
    }

    async markCompleted(req: Request, res: Response) {
        const taskId = parseInt(req.params.id);
        const UserId = (req as AuthRequest).user.id;
        const task = await TaskService.findOne({id: taskId, UserId});
        if (!task) {
            return res.status(404)
                .send({
                    success: false,
                    message: "Task not found"
                });
        }
        const result = await TaskService.update(taskId, { isCompleted: true });
        const _task = await TaskService.findOne({id: taskId, UserId});
        return res.status(200)
            .send({
                success: true,
                message: "Task marked as completed",
                _task
            });
    }
}