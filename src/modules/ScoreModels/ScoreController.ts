import { scoreService } from "./ScoreService";
import { Request, Response } from "express";

class ScoreController {
    async createScore(req: Request, res: Response) {
        const {
            teacher_id,
            student_id,
            rate,
            year,
            matter,
            first_bimester,
            second_bimester,
            third_bimester,
            fourth_bimester,
        } = req.body;

        const score = await scoreService.create({
            teacher_id,
            student_id,
            rate,
            year,
            matter,
            first_bimester,
            second_bimester,
            third_bimester,
            fourth_bimester,
        });

        return res.json(score);
    }

    async list(req: Request, res: Response) {
        const scores = await scoreService.listScore();

        return res.json(scores);
    }

    async get(req: Request, res: Response) {
        const { id } = req.params;

        const score = await scoreService.getScore(parseInt(id));

        return res.json(score);
    }

    async update(req: Request, res: Response) {
        const {
            teacher_id,
            student_id,
            rate,
            year,
            matter,
            first_bimester,
            second_bimester,
            third_bimester,
            fourth_bimester,
        } = req.body;

        const { id } = req.params;

        const updatedScore = await scoreService.update({
            id: parseInt(id),
            teacher_id,
            student_id,
            rate,
            year,
            matter,
            first_bimester,
            second_bimester,
            third_bimester,
            fourth_bimester,
        });

        return res.json(updatedScore);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const deletedScore = await scoreService.delete(parseInt(id));

        return res.json(deletedScore);
    }

    async listScoresByTeacher(req: Request, res: Response){
        const { id } = req.params;

        const scores = await scoreService.listScoresByTeacher(parseInt(id));

        return res.json(scores);
    }
}

export const scoreController = new ScoreController();