'use strict';
import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
import { configSequelize } from '../../config/config';

import { Class } from './ClassModel';
import { User } from './UserModel';
import { Schedule } from './ScheduleModel';
import { Score } from './ScoreModel';
import { TeacherClasses } from './TeacherClasses';

const db: any = {};
const config: any = configSequelize;
const models = [Class, User, Schedule, Score, TeacherClasses];

let sequelize: any = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  config[env]
);

models.forEach((file: any) => {
  const model = file(sequelize);

  db[model.name] = model;
});

Object.keys(db).forEach((modelName: any) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export const database = db;
