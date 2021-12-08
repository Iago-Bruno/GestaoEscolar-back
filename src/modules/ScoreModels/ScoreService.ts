import { database } from "../../database/models";
import { Score } from "../../database/models/ScoreModel";

import { ScoreAttributes } from "../../types/ModelTypes";

class ScoreService {
    scoreModel = Score(database.sequelize);

    async create(data: ScoreAttributes) {
        const scoreAlreadyExists = await this.scoreModel.findOne({
            where: {
                bimester: data.bimester,
                matter: data.matter,
                year: data.year,
            },
        });

        if(scoreAlreadyExists) {
            return { error: "Score already exists!"};
        }

        const score = await this.scoreModel.create({
            teacher_id: data.teacher_id,
            student_id: data.student_id,
            rate: data.rate,
            year: data.year,
            matter: data.matter,
            bimester: data.bimester,
        });

        return score;
    }

    async listScore() {
        return await this.scoreModel.findAll();
    }

    async getScore(id: number) {
        const score = await this.scoreModel.findOne({ where: { id } });

        return score;
    }

    async update(data: ScoreAttributes) {
        const scoreAlreadyExists = await this.scoreModel.findByPk(
            data.id
        );

        if(!scoreAlreadyExists) {
            return { error: "Score does'nt exists!"}
        }

        await scoreAlreadyExists.update(data);

        return scoreAlreadyExists;
    }

    async delete(id: number) {
        const scoreDeleted = await this.scoreModel.findOne({ where: { id } });

        const score = await this.scoreModel.destroy({ where: { id } });

        return scoreDeleted;
    }
}

export const scoreService = new ScoreService();
