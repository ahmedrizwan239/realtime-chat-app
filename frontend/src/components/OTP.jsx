import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Heading, PinInput, PinInputField, Text, Flex, useToast, VStack } from '@chakra-ui/react';
import bgImage from '../assets/bg.svg';

export default function OTP() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(0); 
  const toast = useToast();

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (value) => {
    setOtp(value);
  };

  const handleResend = async () => {
    if (timeLeft > 0) {
      toast({
        title: 'Wait Before Resending',
        description: `Please wait ${timeLeft} seconds before requesting a new OTP.`,
        status: 'info',
        position: 'top-right',
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      // Implement resend OTP logic here
      console.log('Resend OTP');
      toast({
        title: 'OTP Resent',
        description: 'A new OTP has been sent to your email.',
        status: 'success',
        position: 'top-right',
        duration: 3000,
      });
      setTimeLeft(15); // Reset the timer for 15 seconds
    } catch (error) {
      toast({
        title: 'Resend Failed',
        description: 'Failed to resend OTP. Please try again.',
        status: 'error',
        position: 'top-right',
        duration: 3000,
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgImage={`url(${bgImage})`}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Container maxW="md">
        <Box
          bg="white"
          p={8}
          borderRadius="xl"
          boxShadow="lg"
          borderWidth="1px"
          borderColor="blue.300"
        >
          <Heading mb={6} textAlign="center" fontSize="2xl" color="blue.600">
            Verify OTP
          </Heading>
          <Text textAlign="center" mb={4} fontSize="lg" color="gray.600">
            Enter the 4-digit code sent to your email.
          </Text>
          <VStack spacing={4}>
            <Box borderWidth={1} borderRadius="md" p={4} boxShadow="md" borderColor="blue.300">
              <PinInput
                onChange={handleChange}
                type="number"
                size="lg"
                focusBorderColor="blue.500"
                colorScheme="blue"
              >
                <PinInputField mx={1} />
                <PinInputField mx={1} />
                <PinInputField mx={1} />
                <PinInputField mx={1} />
              </PinInput>
            </Box>
            {error && (
              <Box
                p={3}
                mb={4}
                color="red.500"
                bg="red.50"
                borderRadius="md"
                borderWidth="1px"
              >
                {error}
              </Box>
            )}
            <Button
              colorScheme="blue"
              width="full"
              size="lg"
              onClick={handleResend}
              borderRadius="md"
              isLoading={loading}
              isDisabled={timeLeft > 0}
            >
              {timeLeft > 0 ? `Resend OTP (${timeLeft}s)` : 'Resend OTP'}
            </Button>
          </VStack>
        </Box>
      </Container>
    </Flex>
  );
}
