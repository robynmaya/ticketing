import React, { useState } from 'react';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  address: string;
}

export interface CustomerFormProps {
  onChange?: (info: CustomerInfo) => void;
  initial?: CustomerInfo;
}

export default function CustomerForm({
  onChange,
  initial = { firstName: '', lastName: '', address: '' },
}: CustomerFormProps) {
  const [info, setInfo] = useState<CustomerInfo>(initial);

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = { ...info, [e.target.name]: e.target.value };
    setInfo(next);
    onChange?.(next);
  };

  return (
    <div>
      <div>
        <input
          name="firstName"
          placeholder="First Name"
          value={info.firstName}
          onChange={handle}
        />
      </div>
      <div>
        <input
          name="lastName"
          placeholder="Last Name"
          value={info.lastName}
          onChange={handle}
        />
      </div>
      <div>
        <input
          name="address"
          placeholder="Address"
          value={info.address}
          onChange={handle}
        />
      </div>
    </div>
  );
}
