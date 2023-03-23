import orderSchemaModel from '../models/order';
import type { IOrder } from '../models/order';
import { BaseRepository } from './base';
import { TokenUser } from '../../types/request/base';

export default class OrderRepository extends BaseRepository<IOrder> {
  constructor() {
    super(orderSchemaModel);
  }

  async findOrders<IOrder>(params: TokenUser): Promise<Array<IOrder>> {
    const pipeline = [];

    // Match stage to filter documents
    const match = params.isSeller
      ? { sellerId: this.toObjectId(params._id), isCompleted: true }
      : { buyerId: this.toObjectId(params._id), isCompleted: true };

    pipeline.push({ $match: match });

    // Lookup stage to fetch user details and combine with order object
    const lookup = {
      $lookup: {
        from: 'users',
        localField: params.isSeller ? 'buyerId' : 'sellerId',
        foreignField: '_id',
        as: 'userDetails',
      },
    };

    pipeline.push(lookup);

    // Project stage to exclude fields and combine the userDetails object with order object
    const project = {
      $project: {
        __v: 0,
        userDetails: {
          password: 0,
          __v: 0,
          updatedAt: 0,
        },
      },
    };

    pipeline.push(project);

    // Unwind stage to flatten the userDetails array
    const unwind = {
      $unwind: {
        path: '$userDetails',
      },
    };

    pipeline.push(unwind);

    // Execute the aggregation pipeline
    const results = await this._model.aggregate(pipeline);

    return results as IOrder[];
  }
}
