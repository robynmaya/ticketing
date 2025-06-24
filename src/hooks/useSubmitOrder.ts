import { useState } from 'react';
import { submitOrder } from 'services/ticketing';

/**
 * Custom hook to submit an order, managing submission state and result.
 * @returns {{ submit: function, submitting: boolean, confirmation: any, error: Error|null }}
 */
export function useSubmitOrder() {
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState(null);

  async function submit(payload) {
    setSubmitting(true);
    setError(null);
    try {
      const result = await submitOrder(payload);
      setConfirmation(result);
      return result;
    } catch (err) {
      setError(err);
    } finally {
      setSubmitting(false);
    }
  }

  return { submit, submitting, confirmation, error };
}
