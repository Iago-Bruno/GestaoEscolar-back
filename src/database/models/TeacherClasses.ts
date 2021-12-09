import { DataTypes, Model } from "sequelize";
import { TeacherClassesAttributes } from "../../types/ModelTypes";

export const TeacherClasses = ( sequelize: any ) => {
    class TeacherClassesModel extends Model<TeacherClassesAttributes> implements TeacherClassesAttributes {
        id!: number;
        class_id!: number;
        teacher_id!: number;
        
        static associate( models: any ) {
            TeacherClassesModel.belongsTo(models.UserModel);
            TeacherClassesModel.hasMany(models.ClassModel);
        };
    }

    TeacherClassesModel.init({
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
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                key: 'id',
                model: 'users',
            },
        },
    }, {
        sequelize,
        modelName: "TeacherClassesModel",
        tableName: "teacher_classes"
    });

    return TeacherClassesModel;
};



