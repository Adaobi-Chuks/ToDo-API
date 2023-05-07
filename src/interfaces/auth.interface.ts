import { Request } from "express";
import { IUser } from "./user.interface";

export default interface AuthRequest extends Request {
    user: IUser
}