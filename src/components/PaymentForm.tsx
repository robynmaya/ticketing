import React, { useState } from 'react';

export interface PaymentDetails {
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface PaymentFormProps {
  onChange?: (details: PaymentDetails) => void;
  onSubmit: () => void;
  submitDisabled?: boolean;
}

export default function PaymentForm({
  onChange,
  onSubmit,
  submitDisabled = false,
}: PaymentFormProps) {
  const [details, setDetails] = useState<PaymentDetails>({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = { ...details, [e.target.name]: e.target.value };
    setDetails(next);
    onChange?.(next);
  };

  return (
    <div>
      <div>
        <input
          name="cardNumber"
          placeholder="0000 0000 0000 0000"
          value={details.cardNumber}
          onChange={handle}
        />
        <div/>
      </div>

      <div>
        <input
          name="expiry"
          placeholder="MM / YY"
          value={details.expiry}
          onChange={handle}
        />
        <input
          name="cvv"
          placeholder="CVV"
          value={details.cvv}
          onChange={handle}
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={submitDisabled}
      >
        Get Tickets
      </button>
    </div>
  );
}