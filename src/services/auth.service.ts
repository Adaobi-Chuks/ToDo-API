import { IUser } from "../interfaces/user.interface";
import jwt from "jsonwebtoken";
import { MAXAGE, SECRET } from "../configs/constants.config";

//creates a json web token
export const generateAuthToken = (user: IUser) => {
    return jwt.sign({
        id: user.id,
        fullName: user.fullName,
        email: user.email
    }, SECRET, {
        expiresIn: MAXAGE
    });
};