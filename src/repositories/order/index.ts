import { createOrder as mockCreateOrder } from './mock';
import { createOrder as prodCreateOrder } from './production';

const useMocks = process.env.REACT_APP_USE_MOCKS === 'true';
export const createOrder = useMocks
  ? mockCreateOrder
  : prodCreateOrder;