import { getEventById } from 'repositories/event';

/**
 * Fetches an event by its ID and applies basic business validations (assumptions).
 * @param {string} eventId - The ID of the event to retrieve.
 * @returns {Object} Event record with `date` converted to a Date instance.
 * @throws {Error} If the event does not exist.
 */
export async function fetchEvent(eventId) {
  // Retrieve raw event data (mock or production)
  const raw = await getEventById(eventId);

  // Business invariant: event must exist (repo throws if not)

  // Transformations: convert numeric timestamp to Date
  const event = {
    ...raw,
    date: new Date(raw.date),
  };

  return event;
}
