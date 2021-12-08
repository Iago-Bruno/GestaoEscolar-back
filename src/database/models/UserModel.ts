import { DataTypes, Model } from "sequelize";
import { UserAttributes } from "../../types/ModelTypes";

export const User = ( sequelize: any ) => {
    class UserModel extends Model<UserAttributes> implements UserAttributes {
        id!: number;
        class_id?: number;
        name!: string;
        email!: string;
        password!: string;
        type!: string;
        registration!: number;
        
        static associate( models: any ) {
            UserModel.hasMany(models.ScheduleModel);
            UserModel.belongsTo(models.ClassModel);
            UserModel.hasMany(models.ScoreModel, {
                onDelete: 'CASCADE',
            });
        };
    }

    UserModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        class_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                key: 'id',
                model: 'classes',
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        registration: {
            type: DataTypes.BIGINT,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: "UserModel",
        tableName: "users"
    });

    return UserModel;
};



