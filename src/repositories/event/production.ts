export async function getEventById(id) {
    const response = await fetch(`https://api.example.com/events/${id}`);
    if (!response.ok) {
        throw new Error(`Event with ID ${id} not found`);
    }
    const event = await response.json();
    return event;
}