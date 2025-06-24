import React, { useState } from 'react';
import { SimpleGrid, Input } from '@chakra-ui/react';

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
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing="4" mb="4">
      <Input
        name="firstName"
        placeholder="First Name"
        onChange={e => onChange?.({ [e.target.name]: e.target.value } as any)}
      />
      <Input
        name="lastName"
        placeholder="Last Name"
        onChange={e => onChange?.({ [e.target.name]: e.target.value } as any)}
      />
      <Input
        name="address"
        placeholder="Address"
        gridColumn="1 / -1"
        onChange={e => onChange?.({ [e.target.name]: e.target.value } as any)}
      />
    </SimpleGrid>
  );
}
