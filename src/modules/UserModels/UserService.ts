import { database } from "../../database/models";
import { User } from "../../database/models/UserModel";

import { UserAttributes } from "../../types/ModelTypes";

import { compare, hash } from "bcryptjs";
import { sign } from 'jsonwebtoken';

class UserService {
    userModel = User(database.sequelize);

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
}

export const userService = new UserService();