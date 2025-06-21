import { getEventById as mockGetEventById } from "./mock";
import { getEventById as productionGetEventById } from "./production";

export const getEventById = process.env.NODE_ENV === 'production' 
    ? productionGetEventById 
    : mockGetEventById