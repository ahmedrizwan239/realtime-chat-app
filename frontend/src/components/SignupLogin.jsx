import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Flex,
  useToast,
} from '@chakra-ui/react';
import bgImage from '../assets/bg.svg'; 

const SignupLogin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storedName, setStoredName] = useState('');
  const [storedEmail, setStoredEmail] = useState('');
  const [storedPassword, setStoredPassword] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();

  const handleSignUp = (e) => {
    e.preventDefault();
    setStoredName(name);
    setStoredEmail(email);
    setStoredPassword(password);
    setIsSignedUp(true);
    setError('');
    setName('');
    setEmail('');
    setPassword('');

    toast({
      title: "Signed up.",
      description: "You have successfully signed up.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === storedEmail && password === storedPassword) {
      setError('');
      toast({
        title: "Login successful.",
        description: `Welcome, ${storedName}!`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      setError('Invalid credentials');
      toast({
        title: "Login failed.",
        description: "Invalid credentials.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
    setEmail('');
    setPassword('');
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
        >
          <Heading mb={6} textAlign="center" fontSize="2xl" color="blue.600">
            Welcome
          </Heading>
          <Text textAlign="center" mb={4} fontSize="lg" color="gray.600">
            {isSignedUp ? 'Log in to continue' : 'Sign up to continue'}
          </Text>
          <Stack spacing={4}>
            <form onSubmit={isSignedUp ? handleLogin : handleSignUp}>
              {!isSignedUp && (
                <FormControl id="name" isRequired mb={4}>
                  <FormLabel>Name:</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    variant="outline"
                    focusBorderColor="blue.500"
                  />
                </FormControl>
              )}
              <FormControl id="email" isRequired mb={4}>
                <FormLabel>Email:</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  variant="outline"
                  focusBorderColor="blue.500"
                />
              </FormControl>
              <FormControl id="password" isRequired mb={4}>
                <FormLabel>Password:</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  variant="outline"
                  focusBorderColor="blue.500"
                />
              </FormControl>
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
                mt={4}
                colorScheme="blue"
                width="full"
                size="lg"
                type="submit"
                borderRadius="md"
              >
                {isSignedUp ? "Login" : "Sign Up"}
              </Button>
            </form>
            <Button
              mt={4}
              variant="link"
              colorScheme="blue"
              fontWeight="medium"
              onClick={() => setIsSignedUp(!isSignedUp)}
            >
              {isSignedUp ? 'Switch to Signup' : 'Switch to Login'}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Flex>
  );
};

export default SignupLogin;
