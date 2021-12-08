import { DataTypes, Model } from "sequelize";
import { ClassAttributes } from "../../types/ModelTypes";

export const Class = ( sequelize: any ) => {
    class ClassModel extends Model<ClassAttributes> implements ClassAttributes {
        id!: number;
        name!: string;
        code!: string;
        year!: number;

        static associate( models: any ) {
            ClassModel.hasMany(models.UserModel); 
            ClassModel.hasMany(models.ScheduleModel);
        };
    }

    ClassModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: "ClassModel",
        tableName: "classes"
    });

    return ClassModel;
};