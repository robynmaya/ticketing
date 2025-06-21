import kpopBand from 'band-json/kpop-band.json';
import punkBand from 'band-json/punk-band.json';
import skaBand from 'band-json/ska-band.json';

// Simple in-memory mapping of event IDs to band data
const bands = {
    [kpopBand.id]: kpopBand,
    [punkBand.id]: punkBand,
    [skaBand.id]: skaBand,
};

/**
 * Retrives an event by its ID from mock data.
 * @param {string} eventId - The ID of the event to retrieve.
 * @returns event data.
 * @throws {Error} If the event ID does not exist.
 */

export function getEventById(id) {
    const event = bands[id];
    if (!event) {
        throw new Error(`Event with ID ${id} not found`);
    }
    return event
}

