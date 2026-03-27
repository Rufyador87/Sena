import { BaseRepository } from './base-repository.js';

export class VehicleRepository extends BaseRepository {
  constructor() {
    super('vehicles');
  }
}
