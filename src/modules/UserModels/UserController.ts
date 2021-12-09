import { userService } from "./UserService";
import { Request, Response } from "express";

class UserController {
    async createUser(req: Request, res: Response){
        const {
            name,
            registration,
            email,
            type,
            password,
        } = req.body;

        console.log(name, registration, email, type, password);

        const user = await userService.create({
            name,
            registration,
            email,
            type,
            password,
        });

        console.log(user);

        return res.json(user);
    }

    async list(req: Request, res: Response){
        const users = await userService.listUsers();

        return res.json(users);
    }

    async authenticate(request: Request, response: Response){
        const { email, password } = request.body;

        const user = await userService.login(email, password);

        return response.json(user);
    }

    async get(req: Request, res: Response){
        const { id } = req.params;

        const user = await userService.getAUser(parseInt(id));

        return res.json(user);
    }

    async update(req: Request, res: Response){
        const {
            name,
            registration,
            email,
            password,
            type,
        } = req.body;

        const { id } = req.params;
        
        const updatedUser = await userService.update({
            id: parseInt(id),
            name,
            registration,
            email,
            password,
            type,
        });

        return res.json(updatedUser);
    }

    async delete(req: Request, res: Response){
        const { id } = req.params;

        const deletedUser = await userService.delete(parseInt(id));

        return res.json(deletedUser);
    }

    async listScores(req: Request, res: Response) {
        const { id } = req.params;

        const userSerialized = await userService.listScores(parseInt(id));
        return res.json(userSerialized);
    }

    async listTeacherClasses(req: Request, res: Response){
        const { id } = req.params;

        const classes = await userService.listTeacherClasses(parseInt(id));

        return res.json(classes);
    }

    async listStudentsByClass(req: Request, res: Response){
        const { class_id, teacher_id } = req.params;

        const students = await userService.listStudents(parseInt(class_id), parseInt(teacher_id));

        return res.json(students);
    }
}

export const userController = new UserController();