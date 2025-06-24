import React, { useState, useEffect } from 'react';
import { useEvent } from 'hooks/useEvent';
import { useSubmitOrder } from 'hooks/useSubmitOrder';
import BandInfo from 'components/BandInfo';
import TicketSelection, { TicketType } from 'components/TicketSelection';
import CustomerForm, { CustomerInfo } from 'components/CustomerForm';
import PaymentForm, { PaymentDetails } from 'components/PaymentForm';
import LoadingState from 'components/LoadingState';
import ErrorState from 'components/ErrorState';

export interface EventPageProps {
  eventId: string;
}

export default function EventPage({ eventId }: EventPageProps) {
  const { data: event, loading, error: eventError } = useEvent(eventId);
  const {
    submit,
    submitting,
    confirmation,
    error: orderError,
  } = useSubmitOrder();

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    address: '',
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentDetails>({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  // When event loads, init quantities
  // Cant be done in useState directly because event is async
  // and we need to wait for it to load before setting initial state
  // This ensures quantities is always in sync with the event's ticket types
  // and avoids issues if the event changes while the component is mounted
  useEffect(() => {
    if (event) {
      setQuantities(Object.fromEntries(event.ticketTypes.map(t => [t.type, 0])));
    }
  }, [event]);

  const handleSelect = (q: Record<string, number>) => setQuantities(q);
  const hasTickets = Object.values(quantities).some(q => q > 0);

  const handleSubmit = async () => {
    await submit({
      eventId,
      tickets: Object.entries(quantities) // eg [["vip", 2], ["general", 0]]
        .map(([type, qty]) => ({ type, quantity: qty })) // eg [{ type: "vip", quantity: 2 }, { type: "general", quantity: 0 }]
        .filter(t => t.quantity > 0), // eg [{ type: "vip", quantity: 2 }]
      customer: customerInfo,
    });
    if (confirmation) {
      alert(
        `Order confirmed for "${event?.name}"\n` +
        `Date: ${event?.date.toLocaleDateString()}\n` +
        `Location: ${event?.location}\n` +
        `Confirmation #: ${confirmation.confirmationId}`
      );
    }
  };

  if (loading) return <LoadingState />;
  if (eventError)
    return (
      <ErrorState
        message={eventError.message}
      />
    );

  const ticketTypes: TicketType[] = event!.ticketTypes;

  return (
    <div>
      <div>
        <BandInfo event={event!} />
      </div>

      <div>
        <h2>
          Select Tickets
        </h2>
        <TicketSelection
          ticketTypes={ticketTypes}
          onSelect={handleSelect}
          disabled={submitting}
        />

        <h3>
          Customer Info
        </h3>
        <CustomerForm onChange={setCustomerInfo} />

        <h3>
          Payment Details
        </h3>
        <PaymentForm
          onChange={setPaymentInfo}
          onSubmit={handleSubmit}
          submitDisabled={submitting || !hasTickets}
        />

        {orderError && (
          <ErrorState
            message={orderError.message}
            onRetry={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
