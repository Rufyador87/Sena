export class CrudService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    return this.repository.findAll();
  }

  async getById(id) {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw { statusCode: 404, message: 'Registro no encontrado' };
    }
    return entity;
  }

  async create(payload) {
    return this.repository.create(payload);
  }

  async update(id, payload) {
    const entity = await this.repository.update(id, payload);
    if (!entity) {
      throw { statusCode: 404, message: 'Registro no encontrado' };
    }
    return entity;
  }

  async remove(id) {
    const removed = await this.repository.remove(id);
    if (!removed) {
      throw { statusCode: 404, message: 'Registro no encontrado' };
    }
    return { id };
  }
}
