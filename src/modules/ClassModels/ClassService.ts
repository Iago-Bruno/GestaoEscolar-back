import { database } from "../../database/models";
import { Class } from "../../database/models/ClassModel";
import { User } from "../../database/models/UserModel";

import { ClassAttributes } from "../../types/ModelTypes";

class ClassService {
    classModel = Class(database.sequelize);
    userModel = User(database.sequelize);

    async create(data: ClassAttributes) {
        const gradeAlreadyExists = await this.classModel.findOne({
            where: {
              name: data.name,
              code: data.code,
              year: data.year,  
            },
        });

        if(gradeAlreadyExists) {
            return { error: "Class already exists!"};
        }

        const grade = await this.classModel.create({
            name: data.name,
            code: data.code,
            year: data.year,  
        })

        return grade;
    }

    async listClasses() {
        const listClass = await this.classModel.findAll({
            include: [this.userModel],
        });

        return listClass;
    }

    async getClass(id: number) {
        const grade = await this.classModel.findOne({ where: { id } });

        return grade;
    }

    async update(data: ClassAttributes) {
        const gradeAlreadyExists = await this.classModel.findByPk(
            data.id
        );

        if(!gradeAlreadyExists) {
            return { error: "Class does'nt exists!" }
        }

        await gradeAlreadyExists.update(data);

        return gradeAlreadyExists;
    }

    async delete(id: number) {
        const gradeDeleted = await this.classModel.findOne({where: { id } });

        const grade = await this.classModel.destroy({ where: { id } });

        return gradeDeleted;
    }
}

export const classService = new ClassService();