import { DataTypes, Model } from "sequelize";
import { ScoreAttributes } from "../../types/ModelTypes";

export const Score = ( sequelize: any ) => {
    class ScoreModel extends Model<ScoreAttributes> implements ScoreAttributes {
        id!: number;
        teacher_id!: number;
        student_id!: number;
        rate!: number;
        year!: number;
        matter!: string;
        bimester!: string;

        static associate( models: any ) {
            ScoreModel.hasMany(models.UserModel);
        };
    }

    ScoreModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                key: 'id',
                model: 'users',
            },
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                key: 'id',
                model: 'users',
            },
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        matter: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bimester: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: "ScoreModel",
        tableName: "scores"
    });

    return ScoreModel;
};