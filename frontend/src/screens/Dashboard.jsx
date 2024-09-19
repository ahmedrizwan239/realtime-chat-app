import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import {
  Flex,
  Box,
  VStack,
  Text,
  Input,
  Button,
  Avatar,
  HStack,
  IconButton,
  Switch,
} from "@chakra-ui/react";
import { FaSmile, FaPaperPlane, FaMoon, FaSun } from "react-icons/fa";

const socket = io("http://localhost:5000");

const Dashboard = () => {
  const [chats, setChats] = useState([
    { name: "Ahmed", lastMessage: "Hi, how are you?", status: "online" },
    { name: "Uzair", lastMessage: "Hi, how are you?", status: "offline" },
    { name: "Sameer", lastMessage: "Hi, how are you?", status: "online" },
    { name: "Ibad", lastMessage: "Hi, how are you?", status: "online" },
  ]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [message, setMessage] = useState("");

  const toggleColorMode = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });
  }, []);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  // Function to emit message to the server
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", {
        text: message,
      });
      console.log("Message sent:", message);
      setMessage(""); // Clear input after sending
    }
  };

  socket.on("message", (data) => {
    console.log("Message received:", data);
  });

  return (
    <Flex h="100vh">
      {/* Left Sidebar */}
      <Box
        w="30%"
        bg={isDarkMode ? "gray.800" : "white"}
        p={4}
        shadow="lg"
        borderRight="3px solid"
        borderColor={isDarkMode ? "gray.700" : "blue.600"}
        className="custom-scrollbar"
        overflowY="auto"
        maxH="100vh"
      >
        <VStack align="stretch" spacing={5}>
          <HStack justify="space-between">
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color={isDarkMode ? "white" : "blue.700"}
            >
              Messages
            </Text>
            <Switch
              isChecked={isDarkMode}
              onChange={toggleColorMode}
              colorScheme="blue"
              icon={isDarkMode ? <FaSun /> : <FaMoon />}
            />
          </HStack>
          <Input
            placeholder="Search"
            focusBorderColor="blue.500"
            bg={isDarkMode ? "gray.700" : "white"}
            color={isDarkMode ? "white" : "black"}
          />
          <Button colorScheme="blue" variant="solid" borderRadius="full">
            New Group +
          </Button>

          {chats.length === 0 ? (
            // No chats available view
            <VStack align="center" mt={8} spacing={4}>
              <Avatar size="2xl" bg="blue.600" color="white" />
              <Text
                fontSize="lg"
                fontWeight="bold"
                color={isDarkMode ? "white" : "blue.700"}
              >
                No Contacts Yet
              </Text>
              <Text color={isDarkMode ? "gray.400" : "gray.600"}>
                Start a new chat or search for people
              </Text>
            </VStack>
          ) : (
            // Chat list view when chats are available
            <VStack align="stretch" gap={1} mt={4} spacing={4}>
              {chats.map((chat, idx) => (
                <HStack
                  key={idx}
                  align="center"
                  spacing={4}
                  _hover={{ bg: isDarkMode ? "gray.700" : "blue.50" }}
                  p={2}
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => handleChatSelect(chat)}
                >
                  <Avatar name={chat.name} bg="blue.600" position="relative">
                    {/* Status Indicator */}
                    <Box
                      position="absolute"
                      bottom="0"
                      right="0"
                      w="12px"
                      h="12px"
                      borderRadius="full"
                      bg={chat.status === "online" ? "green.400" : "gray.400"}
                    />
                  </Avatar>
                  <Box>
                    <Text
                      fontWeight="bold"
                      color={isDarkMode ? "white" : "black"}
                    >
                      {chat.name}
                    </Text>
                    <Text
                      fontSize="sm"
                      color={isDarkMode ? "gray.400" : "gray.500"}
                    >
                      {chat.lastMessage}
                    </Text>
                  </Box>
                </HStack>
              ))}
            </VStack>
          )}
        </VStack>
      </Box>

      {/* Right Main Chat Area */}
      <Box w="70%" bg={isDarkMode ? "gray.800" : "white"}>
        {!selectedChat ? (
          <Flex
            align="center"
            justify="center"
            h="100%"
            direction="column"
            p={4}
            shadow="lg"
            bg={isDarkMode ? "gray.700" : "blue.100"}
          >
            <Avatar size="2xl" bg="blue.600" color="white" />
            <Text
              fontSize="2xl"
              fontWeight="bold"
              mt={4}
              color={isDarkMode ? "white" : "blue.700"}
            >
              Welcome{" "}
              <Text as="span" color="blue.500">
                User
              </Text>
            </Text>
            <Text color={isDarkMode ? "gray.400" : "gray.600"} mt={2}>
              No chats available
            </Text>
          </Flex>
        ) : (
          <Flex direction="column" h="100%" p={4} shadow="lg">
            {/* Chat Header */}
            <Flex
              direction="column"
              mb={3}
              p={3}
              bg={isDarkMode ? "gray.700" : "blue.100"}
              borderRadius="md"
              shadow="sm"
              position="sticky"
              top="0"
              zIndex="1"
            >
              <HStack spacing={3}>
                <Avatar name={selectedChat.name} bg="blue.600" size="md" />
                <Box>
                  <Text
                    fontSize="md"
                    fontWeight="bold"
                    color={isDarkMode ? "white" : "blue.700"}
                  >
                    {selectedChat.name}
                  </Text>
                </Box>
              </HStack>
            </Flex>

            {/* Chat Messages */}
            <VStack
              align="stretch"
              spacing={5}
              flexGrow={1}
              overflowY="auto"
              className="custom-scrollbar"
            >
              {[
                "Hey, how's it going?",
                "Looking forward to meeting you.",
                "See you soon!",
                "Hey, how's it going?",
                "Looking forward to meeting you.",
                "See you soon!",
                "Hey, how's it going?",
                "Looking forward to meeting you.",
                "See you soon!",
              ].map((msg, idx) => (
                <Box
                  key={idx}
                  alignSelf={idx % 2 === 0 ? "flex-start" : "flex-end"}
                  maxW="75%"
                >
                  <Text
                    bg={
                      idx % 2 === 0
                        ? isDarkMode
                          ? "gray.700"
                          : "blue.50"
                        : "blue.500"
                    }
                    color={
                      idx % 2 === 0 ? (isDarkMode ? "white" : "black") : "white"
                    }
                    p={3}
                    borderRadius="lg"
                    shadow="md"
                  >
                    {msg}
                  </Text>
                </Box>
              ))}
            </VStack>

            {/* Chat Input */}
            <Flex
              mt={4}
              align="center"
              bg={isDarkMode ? "gray.700" : "white"}
              p={2}
              borderRadius="md"
              shadow="md"
            >
              <IconButton
                aria-label="Choose emoji"
                icon={<FaSmile />}
                mr={2}
                colorScheme="blue"
              />
              <Input
                placeholder="Type your message..."
                focusBorderColor="blue.500"
                bg={isDarkMode ? "gray.600" : "white"}
                color={isDarkMode ? "white" : "black"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <IconButton
                aria-label="Send message"
                icon={<FaPaperPlane />}
                size="lg"
                ml={2}
                colorScheme="blue"
                onClick={sendMessage}
              />
            </Flex>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default Dashboard;
