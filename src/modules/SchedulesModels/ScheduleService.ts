import { database } from "../../database/models";
import { Schedule } from "../../database/models/ScheduleModel";

import { ScheduleAttributes } from "../../types/ModelTypes";

class ScheduleService {
    scheduleModel = Schedule(database.sequelize);

    async create(data: ScheduleAttributes) {
        const scheduleAlreadyExists = await this.scheduleModel.findOne({
            where: {
                class_id: data.class_id,
            },
        });

        if(scheduleAlreadyExists) {
            return { error: "Schedule already exists!"};
        }

        const schedule = await this.scheduleModel.create({
            start_time: data.start_time,
            end_time: data.end_time,
            matter: data.matter,
            class_id: data.class_id,
            teacher_id: data.teacher_id,
            
        });

        return schedule;
    }

    async listSchedules() {
        return await this.scheduleModel.findAll();
    }

    async getSchedules(id: number) {
        const schedule = await this.scheduleModel.findOne({ where: { id } });

        return schedule;
    }

    async update(data: ScheduleAttributes) {
        const scheduleAlreadyExists = await this.scheduleModel.findByPk(
            data.id
        );

        if(!scheduleAlreadyExists) {
            return { error: "Schedule does'nt exists!"}
        }

        await scheduleAlreadyExists.update(data);

        return scheduleAlreadyExists;
    }

    async delete(id: number) {
        const scheduleDeleted = await this.scheduleModel.findOne({
            where: {
                id
            }
        });

        const schedule = await this.scheduleModel.destroy({ where: { id } });

        return scheduleDeleted;
    }
}

export const scheduleService = new ScheduleService();