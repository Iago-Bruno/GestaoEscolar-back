import { database } from "../../database/models";
import { User } from "../../database/models/UserModel";

import { ClassAttributes, TeacherClassesAttributes, UserAttributes } from "../../types/ModelTypes";

import { compare, hash } from "bcryptjs";
import { sign } from 'jsonwebtoken';
import { Class } from "../../database/models/ClassModel";
import { Score } from "../../database/models/ScoreModel";
import { TeacherClasses } from "../../database/models/TeacherClasses";

class UserService {
    userModel = User(database.sequelize);
    classModel = Class(database.sequelize);
    scoresModel = Score(database.sequelize);
    teacherClassesModel = TeacherClasses(database.sequelize);

    async create(data: UserAttributes) {
        const userAlreadyExists = await this.userModel.findOne({
            where: {
                email: data.email,
            },
        });

        if(userAlreadyExists){
            return { error: "User already exists!" };
        }

        let passwordHash = await hash(data.password, 8);

        const user = await this.userModel.create({
            email: data.email,
            password: passwordHash,
            name: data.name,
            type: data.type,
            registration: data.registration,
        });

        return user;
    }

    async listUsers() {
        return await this.userModel.findAll();
    }

    async getAUser(id: number) {
        const user = await this.userModel.findOne({ where: { id } });
        
        return user;
    }

    async login(email: string, password: string){

        const user = await this.userModel.findOne({where: { email }});

        if(!user){
            throw new Error("email incorrect");
        }

        const passwordMatch = await compare(password, user.password);
    
        if(!passwordMatch){
            throw new Error("password incorrect");
        }

        const token = sign({
            id: user.id,
            type: user.type,
        }, "a12dba231b8a8276739813ca536ed0d3");

        return { token, type: user.type, user_id: user.id };
    }

    async update(data: UserAttributes){
        const userAlreadyExists = await this.userModel.findByPk(
            data.id
        );

        if(!userAlreadyExists){
            return { error: "User does'nt exists!"}
        }

        await userAlreadyExists.update(data);

        return userAlreadyExists;
    }

    async delete(id: number){
        const userDeleted = await this.userModel.findOne({where: {
            id
        }});

        const user = await this.userModel.destroy({ where: { id } });
        
        return userDeleted;
    }

    async listScores(id: number) {
        const user = await this.userModel.findOne({ where: { id } });

        if (!user) throw new Error("User not found");

        const userClass = await this.classModel.findOne({ where: { id: user?.class_id } });

        const scores = await this.scoresModel.findAll({ where: { student_id: user.id } });

        const userSerialized = {
            user,
            userClass,
            scores,
        };

        return userSerialized;
    }

    async listTeacherClasses(id: number){
        const teacher = await this.userModel.findOne({ where: { id } });

        if (!teacher) throw new Error("User not found");

        const teacherClasses = await this.teacherClassesModel.findAll({
            where: { teacher_id: teacher.id }
        });

        let classes: ClassAttributes[] = [];
        let oneClass;
        for (const teacherClass of teacherClasses){
            oneClass = await this.classModel.findOne({ where: { id: teacherClass.class_id }});

            if (oneClass) {
                classes.push(oneClass);
            }
        }

        return classes;
    }

    async listStudents(class_id: number, teacher_id: number){
        const students = await this.userModel.findAll({ where: { class_id } });

        let studentsSerialized: any[] = [];
        let scores;

        for (const student of students){
            scores = await this.scoresModel.findAll({
                where: { student_id: student.id, teacher_id },
            });

            studentsSerialized.push({
                student,
                scores,
            });
        }

        return studentsSerialized;
    }
}

export const userService = new UserService();