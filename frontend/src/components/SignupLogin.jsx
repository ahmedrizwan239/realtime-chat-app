import { useState } from "react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import bgImage from "../assets/bg.svg";
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
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Login, Signup } from "../services/authService";
import { showToast } from "../utils/toast";

const SignupLogin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await Signup(name, email, password);

      showToast(toast, {
        title: "Signup successful.",
        description: `Welcome, ${
          response.message || "You have successfully signed up."
        }!`,
        status: "success",
      });
      // Clear form fields
      setName("");
      setEmail("");
      setPassword("");
      // Navigate to signin
      setIsSignedUp(true);
    } catch (error) {
      setError(error.message);
      showToast({
        title: "Signup failed.",
        description: error.message,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await Login(email, password);
      showToast(toast, {
        title: "Login successful.",
        description: `Welcome, ${response.user.name || "user"}!`,
        status: "success",
      });
      // Clear form fields
      setEmail("");
      setPassword("");
    } catch (error) {
      showToast(toast, {
        title: "Login failed.",
        description: error.message,
        status: "error",
      });
      // Handle additional logic like redirecting the user
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
        >
          <Heading mb={6} textAlign="center" fontSize="2xl" color="blue.600">
            Welcome
          </Heading>
          <Text textAlign="center" mb={4} fontSize="lg" color="gray.600">
            {isSignedUp ? "Log in to continue" : "Sign up to continue"}
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
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    variant="outline"
                    focusBorderColor="blue.500"
                  />
                  <InputRightElement>
                    <IconButton
                      variant="link"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                </InputGroup>
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
                isLoading={loading}
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
              {isSignedUp ? "Switch to Signup" : "Switch to Login"}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Flex>
  );
};

export default SignupLogin;
