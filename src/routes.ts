import express from 'express';

const router = express.Router();

import { userController } from './modules/UserModels/UserController';
import { classController } from './modules/ClassModels/ClassController';
import { scheduleController } from './modules/SchedulesModels/ScheduleController';
import { scoreController } from './modules/ScoreModels/ScoreController';

router.post('/users', userController.createUser);
router.get('/users', userController.list);
router.get('/users/:id', userController.get);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

router.post('/login', userController.authenticate);

router.post('/classes', classController.createClass);
router.get('/classes', classController.list);
router.get('/classes/:id', classController.get);
router.put('/classes/:id', classController.update);
router.delete('/classes/:id', classController.delete);

router.post('/schedules', scheduleController.createSchedule);
router.get('/schedules', scheduleController.list);
router.get('/schedules/:id', scheduleController.get);
router.put('/schedules/:id', scheduleController.update);
router.delete('/schedules/:id', scheduleController.delete);

router.post('/score', scoreController.createScore);
router.get('/score', scoreController.list);
router.get('/score/:id', scoreController.get);
router.put('/score/:id', scoreController.update);
router.delete('/score/:id', scoreController.delete);

export default router;