import { createOrder } from 'repositories/order';
import { fetchEvent } from './event';

/**
 * Submits a new ticket order after validating business rules.
 * @param payload.eventId  – which event to order for
 * @param payload.tickets  – array of { type, quantity }
 * @param payload.customer – customer info
 * @returns the created order record (including confirmationId)
 * @throws Error if validation fails
 */
export async function submitOrder(payload) {
  const { eventId, tickets, customer } = payload;

  // Must pick at least one ticket
  if (!tickets || tickets.length === 0) {
    throw new Error('No tickets selected');
  }

  // Event must exist and not be sold out
  const event = await fetchEvent(eventId);
  if (event.ticketTypes.length === 0) {
    throw new Error('Event is sold out');
  }

  // Delegate to repo (mock or prod)
  return await createOrder({
    ...payload,
    time: Date.now(),
  });
}