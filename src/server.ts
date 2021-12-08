import express, { json } from "express";
import { database } from './database/models/index';
import router from "./routes";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(json());
app.use(router);

// { alter: true }

database.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('App runing in port 3001');
    });
}).catch((error: any) => console.log(error));
