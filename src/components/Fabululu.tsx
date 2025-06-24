import React, { useState } from 'react';
import {
  Box,
  Text,
  useDisclosure,
  BoxProps,
  ButtonProps,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@chakra-ui/react';

// Create a motion-wrapped Chakra Button
const MotionButton = motion<ButtonProps>(Button);
const MotionBox   = motion(Box);

export default function Fabululu(props: BoxProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasPopped, setHasPopped] = useState(false);

  const handleClick = () => {
    if (hasPopped) {
      onClose();
      setTimeout(() => {
        setHasPopped(false);
        onOpen();
        setHasPopped(true);
      }, 300);
    } else {
      setHasPopped(true);
      onOpen();
    }
  };

  return (
    <Box position="relative" display="inline-block" {...props}>
      {/* Shaking Button */}
      <MotionButton
        colorScheme="pink"
        onClick={handleClick}
        whileHover={{ x: [0, -4, 4, -4, 4, 0], transition: { duration: 0.4, ease: 'easeInOut' } }}
      >
        Click me
      </MotionButton>

      {/* Bottom popup on click */}
      <AnimatePresence>
        {isOpen && (
          <MotionBox
            as="footer"
            position="fixed"
            bottom="4"
            left="50%"
            transform="translateX(-50%)"
            bg="white"
            borderRadius="lg"
            p="4"
            shadow="2xl"
            display="flex"
            alignItems="center"
            zIndex={1000}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <MotionBox
              fontSize="2xl"
              mr="3"
              animate={{ rotate: [0, 15, -15, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              👋
            </MotionBox>
            <Text fontSize="md">
              Thank you for the opportunity and looking forward to meeting y’all!
            </Text>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}
