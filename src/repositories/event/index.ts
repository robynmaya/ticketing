import { getEventById as mockGetEventById } from "./mock";
import { getEventById as productionGetEventById } from "./production";

const useMocks = process.env.REACT_APP_USE_MOCKS === 'true';

export const getEventById = useMocks
  ? mockGetEventById
  : productionGetEventById