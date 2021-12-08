import { DataTypes, Model } from "sequelize";
import { ScheduleAttributes } from "../../types/ModelTypes";

export const Schedule = ( sequelize: any ) => {
    class ScheduleModel extends Model<ScheduleAttributes> implements ScheduleModel {
        id!: number;
        teacher_id!: number;
        class_id!: number;
        start_time!: string;
        end_time!: string;
        matter!: string;

        static associate( models: any ) {
            ScheduleModel.belongsTo(models.UserModel);
            ScheduleModel.belongsTo(models.ClassModel);
        };
    }

    ScheduleModel.init({
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
        class_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                key: 'id',
                model: 'classes',
            },
        },
        start_time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        matter: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: "ScheduleModel",
        tableName: "schedules",
    });

    return ScheduleModel;
};