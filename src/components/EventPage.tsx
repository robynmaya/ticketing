import React, { useState, useEffect } from 'react';
import {
  VStack, Flex, Box, Heading, Stack,
  Spinner, Alert, AlertIcon, useToast, Text
} from '@chakra-ui/react';
import { useEvent } from 'hooks/useEvent';
import { useSubmitOrder } from 'hooks/useSubmitOrder';
import BandInfo from 'components/BandInfo';
import TicketSelection, { TicketType } from 'components/TicketSelection';
import CustomerForm, { CustomerInfo } from 'components/CustomerForm';
import PaymentForm, { PaymentDetails } from 'components/PaymentForm';
import Fabululu from './Fabululu';

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
  const toast = useToast();

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

  // Whenever `event` changes (i.e. user picked a new eventId), reset state:
  useEffect(() => {
    if (!event) return

    // reset ticket counts
    setQuantities(
      Object.fromEntries(event.ticketTypes.map(t => [t.type, 0]))
    )
    // reset forms
    setCustomerInfo({ firstName: '', lastName: '', address: '' })
    setPaymentInfo({ cardNumber: '', expiry: '', cvv: '' })
  }, [event])

  useEffect(() => {
    if (!confirmation) return;
    
    toast({
      status: 'success',
      duration: 5000,
      isClosable: true,
      render: () => (
        <Box
          p={4}
          bg="green.500"
          color="white"
          borderRadius="md"
          boxShadow="lg"
        >
          <Text fontWeight="bold">🎉 Order Confirmed!</Text>
          <Text>Event: {event?.name}</Text>
          <Text>Date: {event?.date.toLocaleDateString()}</Text>
          <Text>Location: {event?.location}</Text>
          <Text>Confirmation: {confirmation.confirmationId}</Text>
          <Text>Thank you for your purchase!</Text>
        </Box>
      ),
    });
  }, [confirmation, toast]);

  const handleSelect = (q: Record<string, number>) => setQuantities(q);
  const hasTickets = Object.values(quantities).some(q => q > 0);
  const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

  const isValidCustomerInfo = (info: CustomerInfo) => {
    return (
      namePattern.test(info.firstName.trim()) &&
      namePattern.test(info.lastName.trim()) &&
      info.firstName.trim().length > 0 &&
      info.lastName.trim().length > 0 &&
      info.address.trim().length > 0
    )
  };

  const isValidPaymentInfo = (info: PaymentDetails) => {
    return (
      /^\d{12,19}$/.test(info.cardNumber.replace(/\s/g, "")) && // 12-19 digits, no spaces
      /^\d{2}\/\d{2}$/.test(info.expiry) && // MM/YY format
      /^\d{3,4}$/.test(info.cvv) // 3 or 4 digits
    );
  };

  const handleSubmit = async () => {
    if (
      !hasTickets ||
      !isValidCustomerInfo(customerInfo) ||
      !isValidPaymentInfo(paymentInfo)
    ) {
      toast({
        status: 'error',
        duration: 5000,
        isClosable: true,
        render: () => (
          <Box
            p={4}
            bg="red.500"
            color="white"
            borderRadius="md"
            boxShadow="lg"
          >
            <Text fontWeight="bold">⚠️ Invalid Submission</Text>
            <Text>Please ensure you have selected tickets and filled out all fields correctly.</Text>
          </Box>
        ),
      });
      return;
    }

    await submit({
      eventId,
      tickets: Object.entries(quantities) // eg [["vip", 2], ["general", 0]]
        .map(([type, qty]) => ({ type, quantity: qty })) // eg [{ type: "vip", quantity: 2 }, { type: "general", quantity: 0 }]
        .filter(t => t.quantity > 0), // eg [{ type: "vip", quantity: 2 }]
      customer: customerInfo,
    });
  };

  if (loading) return <Spinner size="xl" />;
  if (eventError) return <Alert status="error"><AlertIcon />{eventError.message}</Alert>;

  const ticketTypes: TicketType[] = event!.ticketTypes;

  return (
    <VStack spacing={8} align="stretch" maxW="6xl" mx="auto" py={8} px={4}>
      <Flex maxW="6xl" mx="auto" py="8" px="4" gap="8" wrap="wrap">
        <Box flex="2 1 0"><BandInfo event={event!} /></Box>
        <Box flex="1 1 0" bg="white" p="6" rounded="lg" shadow="lg">
          <Stack spacing="6">
            <Heading size="md">Select Tickets</Heading>
            <TicketSelection
              ticketTypes={ticketTypes}
              onSelect={handleSelect}
              disabled={submitting}
            />
            <Heading size="sm">Customer Info</Heading>
            <CustomerForm onChange={setCustomerInfo} />

            <Heading size="sm">Payment Details</Heading>
            <PaymentForm
              onChange={setPaymentInfo}
              onSubmit={handleSubmit}
              submitDisabled={submitting}
            />
            {orderError && <Alert status="error"><AlertIcon />{orderError.message}</Alert>}
          </Stack>
        </Box>
      </Flex>
      {/* footer */}
      <Box as="footer" py={4} textAlign="center">
        <Fabululu />
      </Box>
    </VStack>
  );
}
