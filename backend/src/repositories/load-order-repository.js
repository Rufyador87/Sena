import { BaseRepository } from './base-repository.js';

export class LoadOrderRepository extends BaseRepository {
  constructor() {
    super('load_orders');
  }
}
