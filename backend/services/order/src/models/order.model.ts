import {Entity, model, property} from '@loopback/repository';

@model()
export class Order extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  items: string[];

  @property({
    type: 'number',
    required: true,
  })
  status: number;


  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
