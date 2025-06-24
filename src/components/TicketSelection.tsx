import React, { useState } from 'react';

export interface TicketType {
  type: string;
  name: string;
  description: string;
  cost: number;
}

export interface TicketSelectionProps {
  ticketTypes: TicketType[];
  onSelect: (quantities: Record<string, number>) => void;
  disabled?: boolean;
}

export default function TicketSelection({
  ticketTypes,
  onSelect,
  disabled = false,
}: TicketSelectionProps) {
  const [quantities, setQuantities] = useState(
    Object.fromEntries(ticketTypes.map((t) => [t.type, 0]))
  );

  const handleChange = (type: string, value: number) => {
    const next = { ...quantities, [type]: value };
    setQuantities(next);
    onSelect(next);
  };

  const total = ticketTypes.reduce(
    (sum, t) => sum + (quantities[t.type] || 0) * t.cost,
    0
  );

  return (
    <div>
      <div>Select Tickets</div>
      {ticketTypes.map((t) => (
        <div key={t.type}>
          <div>
            <p>{t.name}</p>
            <p>{t.description}</p>
            <p>${(t.cost / 100).toFixed(0)}</p>
          </div>
          <input
            type="number"
            min={0}
            disabled={disabled}
            value={quantities[t.type]}
            onChange={(e) => handleChange(t.type, Number(e.target.value))}
          />
        </div>
      ))}

      <div>
        <span>Total</span>
        <span>${(total / 100).toFixed(0)}</span>
      </div>
    </div>
  );
}