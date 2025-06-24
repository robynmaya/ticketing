import React, { useState } from 'react';
import { Box, Select, Container, Heading } from '@chakra-ui/react';
import EventPage from './components/EventPage';

import kpopBand from './band-json/kpop-band.json';
import punkBand from './band-json/punk-band.json';
import skaBand from './band-json/ska-band.json';

const allEvents = [kpopBand, punkBand, skaBand];

export default function App() {
  const [eventId, setEventId] = useState(allEvents[0].id);

  return (
    <Container maxW="container.xl" py="6">
      {/* Event selector dropdown */}
      <Box mb="6">
        <Heading size="md" mb="2">
          Pick an Event
        </Heading>
        <Select
          placeholder="Select event..."
          value={eventId}
          onChange={e => setEventId(e.target.value)}
          maxW="300px"
        >
          {allEvents.map(evt => (
            <option key={evt.id} value={evt.id}>
              {evt.name}
            </option>
          ))}
        </Select>
      </Box>

      {/* 
        Ideally we'd use React Router (or similar) to map `/events/:id` → <EventPage id={id} />.
        For the purposes of this exercise—focused on data wiring, hooks, and form development—
        a simple dropdown + key-based remount is sufficient to demonstrate the flow.
      */}
      <Box w="100%">
        <EventPage key={eventId} eventId={eventId} />
      </Box>
    </Container>
  );
}
