import { useState, useEffect } from 'react';
import { fetchEvent } from 'services/ticketing';

/**
 * Custom hook to load an event by ID, managing loading and error state.
 * @param {string} eventId - ID of the event to fetch
 * @returns {{ data: Object|null, loading: boolean, error: Error|null }}
 */
export function useEvent(eventId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchEvent(eventId)
      .then(evt => setData(evt))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [eventId]);

  return { data, loading, error };
}
