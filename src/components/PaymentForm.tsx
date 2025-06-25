import React, { useState } from 'react';
import { Box, Input, SimpleGrid, Button } from '@chakra-ui/react';

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
    <Box mb="4">
      <Input
        name="cardNumber"
        value={details.cardNumber}
        type="number"
        inputMode="numeric"
        placeholder="0000 0000 0000 0000"
        mb="3"
        onChange={handle}
      />
      <SimpleGrid columns={2} spacing="3" mb="3">
        <Input
          name="expiry"
          value={details.expiry}
          type="text"
          placeholder="MM/YY"
          onChange={handle}
        />
        <Input
          name="cvv"
          value={details.cvv}
          type="number"
          inputMode="numeric"
          placeholder="CVV"
          onChange={handle}
        />
      </SimpleGrid>
      <Button
        colorScheme="pink"
        bgGradient="linear(to-r, pink.400, pink.500)"
        _hover={{ bgGradient: 'linear(to-r, pink.500, pink.600)' }}
        w="100%"
        onClick={onSubmit}
        isDisabled={submitDisabled}
      >
        Get Tickets
      </Button>
    </Box>
  );
}