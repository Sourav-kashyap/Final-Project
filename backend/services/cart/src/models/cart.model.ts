import {Entity, model, property} from '@loopback/repository';

@model()
export class Cart extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  productsId: string[];

  constructor(data?: Partial<Cart>) {
    super(data);
  }
}

export interface CartRelations {
  // describe navigational properties here
}

export type CartWithRelations = Cart & CartRelations;
