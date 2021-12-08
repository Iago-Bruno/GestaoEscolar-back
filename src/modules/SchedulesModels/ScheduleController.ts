import { scheduleService } from "./ScheduleService";
import { Request, Response } from "express";

class ScheduleController {
    async createSchedule(req: Request, res: Response) {
        const {
            start_time,
            end_time,
            matter,
            class_id,
            teacher_id,
        } = req.body;

        const schedule = await scheduleService.create({
            start_time,
            end_time,
            matter,
            class_id,
            teacher_id,
        });

        return res.json(schedule);
    }

    async list(req: Request, res: Response) {
        const schedules = await scheduleService.listSchedules();

        return res.json(schedules);
    }

    async get(req: Request, res: Response) {
        const { id } = req.params;

        const schedule = await scheduleService.getSchedules(parseInt(id));

        return res.json(schedule);
    }

    async update(req: Request, res: Response) {
        const {
            start_time,
            end_time,
            matter,
        } = req.body;

        const { id } = req.params;

        const updatedSchedule = await scheduleService.update({
            id: parseInt(id),
            start_time,
            end_time,
            matter,
        });

        return res.json(updatedSchedule);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const deletedSchedule = await scheduleService.delete(parseInt(id));

        return res.json(deletedSchedule);
    }
}

export const scheduleController = new ScheduleController();