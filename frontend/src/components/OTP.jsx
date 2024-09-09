import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Container, Heading, PinInput, PinInputField, Text, Flex, useToast, VStack } from '@chakra-ui/react';
import bgImage from '../assets/bg.svg';
import { sendOtp, verifyOtp } from '../services/authService';
import { showToast } from '../utils/toast';
import { AuthContext } from '../services/authContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function OTP() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [maskedEmail, setMaskedEmail] = useState('');
  const toast = useToast();
  const { setIsOTPVerified } = useContext(AuthContext); // Access context to update OTP status
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setMaskedEmail(maskEmail(email));
    }
  }, []);

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

  const maskEmail = (email) => {
    const [localPart, domain] = email.split('@');
    const visibleChars = 2;
    const maskedLocalPart = localPart.slice(0, visibleChars) + '*'.repeat(localPart.length - visibleChars);
    return `${maskedLocalPart}@${domain}`;
  };

  const handleChange = (value) => {
    setOtp(value);
  };

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
      setIsOTPVerified(true); // Update OTP verified status
      navigate("/"); // Redirect to login after successful verification
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
