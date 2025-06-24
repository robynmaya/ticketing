import React, { useState } from 'react';
import {
  Box, Flex, Text,
  NumberInput, NumberInputField,
  NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  Divider,
  VisuallyHidden,
} from '@chakra-ui/react';

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
    <Box bg="white" p="4" rounded="md" shadow="sm">
      {ticketTypes.map(t => (
        <Flex key={t.type} align="center" justify="space-between" py="2">
          <Box>
            <Text fontWeight="medium">{t.name}</Text>
            <Text fontSize="sm" color="gray.600">{t.description}</Text>
            <Text fontWeight="semibold">${(t.cost/100).toFixed(0)}</Text>
          </Box>
          <VisuallyHidden as="label" htmlFor={`qty-${t.type}`}>
            {t.name} quantity
          </VisuallyHidden>
          <NumberInput
            id={`qty-${t.type}`}
            size="sm"
            maxW="20"
            min={0}
            value={quantities[t.type]}
            onChange={(_, val) => handleChange(t.type, val)}
            isDisabled={disabled}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
      ))}
      <Divider mt="2" mb="2" />
      <Flex justify="space-between" fontWeight="bold">
        <Text>Total</Text>
        <Text>${(total/100).toFixed(0)}</Text>
      </Flex>
    </Box>
  );
}