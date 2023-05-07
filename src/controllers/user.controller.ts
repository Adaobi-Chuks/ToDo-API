import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateAuthToken } from "../services/auth.service";
import { MAXAGE, MESSAGES, SALTROUNDS } from "../configs/constants.config";
import Service from "../services/user.service";
import { IUser } from "../interfaces/user.interface";
const UserService = new Service();
const {
    CREATED,
    DUPLICATE_EMAIL,
    INVALID_USERNAME,
    INVALID_PASSWORD,
    LOGGEDIN
} = MESSAGES.USER

export default class UserController {

    async createUser(req: Request, res: Response) {
        const {email, password, fullName} = req.body;

        //checks if another user with email exists
        if (await UserService.findOne({email})) {
            //sends an error if the email exists
            return res.status(409)
            .send({
                success: false,
                message: DUPLICATE_EMAIL
            });
        }
        const salt = await bcrypt.genSalt(SALTROUNDS);
        const _password = await bcrypt.hash(password, salt);

        //create a new user
        const createdUser = await UserService.create({
            email,
            fullName,
            password: _password
        });

        const token = generateAuthToken(createdUser as any);
        res.cookie("token", token, {
            httpOnly: true, 
            maxAge: MAXAGE * 1000 
        });

        // Return success message
        return res.status(201)
        .send({
            success: true,
            message: CREATED,
            createdUser: createdUser
            
        });    
    }

    async login(req: Request, res: Response) {
        const {email, password} = req.body;
        const _user = await UserService.findOneWithP({email}) as unknown as IUser;
        const __user = await UserService.findOne({email}) as unknown as IUser;
        
        if (!_user) {
            return res.status(400)
                .send({
                    success: false,
                    message: INVALID_USERNAME
                });
        }
        const validPassword = await bcrypt.compare(password, _user.password);
        if (!validPassword) {
            return res.status(400)
                .send({
                    success: false,
                    message: INVALID_PASSWORD
                });
        }
        const token = generateAuthToken(_user as unknown as IUser);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: MAXAGE * 1000
        });
        return res.status(200).send({
            success: true,
            message: LOGGEDIN,
            user: __user
        });
    }
}