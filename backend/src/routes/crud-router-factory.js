import { Router } from 'express';

export const createCrudRouter = (controller, middlewares = []) => {
  const router = Router();

  router.get('/', ...middlewares, controller.getAll);
  router.get('/:id', ...middlewares, controller.getById);
  router.post('/', ...middlewares, controller.create);
  router.put('/:id', ...middlewares, controller.update);
  router.patch('/:id', ...middlewares, controller.update);
  router.delete('/:id', ...middlewares, controller.remove);

  return router;
};
