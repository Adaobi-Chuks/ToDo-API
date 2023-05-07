import express from "express";
const router = express.Router();
import UserController from "../controllers/user.controller";
const {
    createUser,
    login
} = new UserController();
import TaskController from "../controllers/task.controller";
import authenticate from "../middlewares/authentication.middleware";
const {
    create,
    getAll,
    getOne,
    update,
    deletee,
    markCompleted
} = new TaskController();

router.post("/users", createUser);
router.post("/users/login", login);

router.post("/tasks", authenticate, create);
router.get("/tasks", authenticate, getAll);
router.get("/tasks/:id", authenticate, getOne);
router.put("/tasks/:id", authenticate, update);
router.delete("/tasks/:id", authenticate, deletee);
router.put("/tasks/done/:id", authenticate, markCompleted);


export default router;