import React from 'react';
import { Box, Image, Heading, Flex, Text, Stack } from '@chakra-ui/react';

export interface BandInfoProps {
  event: {
    name: string;
    date: Date;
    location: string;
    description_blurb: string;
    imgUrl: string;
  };
}

export default function BandInfo({ event }: BandInfoProps) {
  return (
    <Box borderRadius="lg" overflow="hidden" boxShadow="md">
      <Box pos="relative" h="240px">
        <Image
          src={event.imgUrl}
          alt={event.name}
          objectFit="cover"
          w="100%" h="100%"
          filter="brightness(0.7)"
        />
        <Box
          pos="absolute" inset="0"
          bgGradient="linear(to-b, transparent, blackAlpha.700)"
        />
        <Stack pos="absolute" bottom="4" left="6" spacing="1">
          <Heading size="2xl" color="white">{event.name}</Heading>
          <Flex color="whiteAlpha.800" fontSize="sm" gap="4">
            <Text>📅 {event.date.toLocaleDateString()} </Text>
            <Text>📍 {event.location}</Text>
          </Flex>
        </Stack>
      </Box>

      <Box p="6" bg="whiteAlpha.800" backdropFilter="blur(8px)">
        <Text
          color="gray.800"
          lineHeight="tall"
          dangerouslySetInnerHTML={{ __html: event.description_blurb }}
        />
      </Box>
    </Box>
  );
}