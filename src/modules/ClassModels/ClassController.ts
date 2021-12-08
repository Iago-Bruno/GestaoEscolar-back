import { classService } from "./ClassService";
import { Request, Response } from "express";

class ClassController {
    async createClass(req: Request, res: Response) {
        const {
            name,
            code,
            year,
        } = req.body;

        const grade = await classService.create({
            name,
            code,
            year,
        });

        return res.json(grade);
    }

    async list(req: Request, res:Response) {
        const grades = await classService.listClasses();

        return res.json(grades);
    }

    async get(req: Request, res: Response) {
        const { id } = req.params;

        const grade = await classService.getClass(parseInt(id));

        return res.json(grade);
    }

    async update(req: Request, res: Response) {
        const {
            name,
            code,
            year,
        } = req.body;

        const { id } = req.params;

        const updateGrade = await classService.update({
            id: parseInt(id),
            name,
            code,
            year,
        });

        return res.json(updateGrade);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const deletedGrade = await classService.delete(parseInt(id));

        return res.json(deletedGrade);
    }
}

export const classController = new ClassController();