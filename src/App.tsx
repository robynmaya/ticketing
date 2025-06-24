import React from 'react';
import EventPage from 'components/EventPage';

function App() {
  // For now, hardcode the event ID; later this could come from routing.
  const eventId = 'btess';

  return (
    <div className="app-container">
      <EventPage eventId={eventId} />
    </div>
  );
}

export default App;
