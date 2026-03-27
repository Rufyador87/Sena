export const createCrudController = (service) => ({
  getAll: async (_req, res, next) => {
    try {
      const data = await service.getAll();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const data = await service.getById(Number(req.params.id));
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const data = await service.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const data = await service.update(Number(req.params.id), req.body);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
  remove: async (req, res, next) => {
    try {
      const data = await service.remove(Number(req.params.id));
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
});
