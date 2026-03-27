import { Router } from 'express';
import authRoutes from './auth-routes.js';
import { requireAuth, allowRoles } from '../middlewares/auth.js';
import { createCrudRouter } from './crud-router-factory.js';
import { createCrudController } from '../controllers/crud-controller-factory.js';
import { CrudService } from '../services/crud-service.js';
import { UserRepository } from '../repositories/user-repository.js';
import { VehicleRepository } from '../repositories/vehicle-repository.js';
import { ShiftRepository } from '../repositories/shift-repository.js';
import { DockRepository } from '../repositories/dock-repository.js';
import { LoadOrderRepository } from '../repositories/load-order-repository.js';

const router = Router();

const protectedMiddleware = [requireAuth];
const adminOnly = [requireAuth, allowRoles('coordinador')];

const usersController = createCrudController(new CrudService(new UserRepository()));
const vehiclesController = createCrudController(new CrudService(new VehicleRepository()));
const shiftsController = createCrudController(new CrudService(new ShiftRepository()));
const docksController = createCrudController(new CrudService(new DockRepository()));
const loadOrdersController = createCrudController(new CrudService(new LoadOrderRepository()));

router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'OptiLogistics API operativa' });
});

router.use('/auth', authRoutes);
router.use('/users', createCrudRouter(usersController, adminOnly));
router.use('/vehicles', createCrudRouter(vehiclesController, protectedMiddleware));
router.use('/shifts', createCrudRouter(shiftsController, protectedMiddleware));
router.use('/docks', createCrudRouter(docksController, protectedMiddleware));
router.use('/load-orders', createCrudRouter(loadOrdersController, protectedMiddleware));

export default router;
