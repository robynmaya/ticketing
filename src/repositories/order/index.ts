import { createOrder as mockCreateOrder } from './mock';
import { createOrder as prodCreateOrder } from './production';

export const createOrder =
  process.env.NODE_ENV === 'production' ? prodCreateOrder : mockCreateOrder;
