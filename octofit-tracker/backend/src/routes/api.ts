import { Router } from 'express';
import type { Model } from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

function createCrudRouter(model: Model<any>) {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      const records = await model.find().sort({ createdAt: -1 });
      response.json(records);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (request, response, next) => {
    try {
      const record = await model.findById(request.params.id);
      if (!record) {
        response.status(404).json({ error: 'Record not found' });
        return;
      }
      response.json(record);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request, response, next) => {
    try {
      const record = await model.create(request.body);
      response.status(201).json(record);
    } catch (error) {
      next(error);
    }
  });

  router.patch('/:id', async (request, response, next) => {
    try {
      const record = await model.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true,
      });
      if (!record) {
        response.status(404).json({ error: 'Record not found' });
        return;
      }
      response.json(record);
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:id', async (request, response, next) => {
    try {
      const record = await model.findByIdAndDelete(request.params.id);
      if (!record) {
        response.status(404).json({ error: 'Record not found' });
        return;
      }
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  });

  return router;
}

const apiRouter = Router();

function createLeaderboardRouter() {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      const records = await Leaderboard.find().populate('user', 'displayName username').sort({ points: -1 });
      response.json(records);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (request, response, next) => {
    try {
      const record = await Leaderboard.findById(request.params.id).populate('user', 'displayName username');
      if (!record) {
        response.status(404).json({ error: 'Record not found' });
        return;
      }
      response.json(record);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

apiRouter.use('/users', createCrudRouter(User));
apiRouter.use('/teams', createCrudRouter(Team));
apiRouter.use('/activities', createCrudRouter(Activity));
apiRouter.use('/workouts', createCrudRouter(Workout));
apiRouter.use('/leaderboard', createLeaderboardRouter());

export default apiRouter;