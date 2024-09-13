import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Heading, PinInput, PinInputField, Text, Flex, useToast, VStack } from '@chakra-ui/react';
import bgImage from '../assets/bg.svg';
import { sendOtp, verifyOtp } from '../services/authService';
import { showToast } from '../utils/toast';

export default function OTP() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [maskedEmail, setMaskedEmail] = useState('');
  const toast = useToast();

  // Retrieve and mask the email when the component mounts
  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setMaskedEmail(obfuscateEmail(email));
    }
  }, []);

  // Handle the countdown timer for OTP resend
  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Function to obfuscate email address  
  const obfuscateEmail = (email) => {
    const [localPart, domainPart] = email.split('@');
    const obfuscatedLocal = localPart[0] + '*'.repeat(localPart.length - 1);
    const [domainName, domainExtension] = domainPart.split('.');
    const obfuscatedDomain = '*'.repeat(domainName.length - 1) + domainName.slice(5);
    return `${obfuscatedLocal}@${obfuscatedDomain}.${domainExtension}`;
  };

  const handleChange = (value) => {
    setOtp(value);
  };

  // Handle OTP resend
  const handleResend = async () => {
    setError("");
    const email = localStorage.getItem('email');
    setLoading(true);
    try {
      const res = await sendOtp(email);
      showToast(toast, {
        title: res.message,
        description: "A new OTP has been sent to your email.",
        status: "success",
      });
      setTimeLeft(30);
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

  // Handle OTP verification
  const handleVerify = async () => {
    setError("");
    setLoading(true);
    const email = localStorage.getItem('email');
    try {
      const res = await verifyOtp({ otp, email });
      showToast(toast, {
        title: res.message,
        description: "OTP has been verified successfully.",
        status: "success",
      });
      // Redirect or perform actions after successful verification
    } catch (error) {
      toast({
        title: 'Verification Failed',
        description: 'Failed to verify OTP. Please try again.',
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
            Enter the 4-digit code sent to your email: {maskedEmail}
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
              borderRadius="md"
              isLoading={loading}
              onClick={handleVerify}
            >
              Verify
            </Button>
            <Button
              variant={'outline'}
              colorScheme="blue"
              width="full"
              size="lg"
              onClick={handleResend}
              borderRadius="md"
              isDisabled={timeLeft > 0 || loading}
            >
              {timeLeft > 0 ? `Resend OTP (${timeLeft}s)` : 'Resend OTP'}
            </Button>
          </VStack>
        </Box>
      </Container>
    </Flex>
  );
}
