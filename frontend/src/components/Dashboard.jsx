import React, { useState } from 'react';
import { Flex, Box, VStack, Text, Input, Button, Avatar, HStack, IconButton } from "@chakra-ui/react";
import { FaSmile, FaPaperPlane, FaRegLaugh } from "react-icons/fa";

export default function Dashboard() {
    // State to hold the chat data
    const [chats, setChats] = useState([
        { name: "Ahmed", lastMessage: "Hi, how are you?" },
    ]);

    return (
        <Flex h="100vh" bg="blue.50">
            {/* Left Sidebar */}
            <Box w="25%" bg="white" p={4} borderRight="1px solid #cbd5e0" shadow="lg">
                <VStack align="stretch" spacing={6}>
                    <Text fontSize="2xl" fontWeight="bold" color="blue.700">
                        Messages
                    </Text>
                    <Input placeholder="Search" focusBorderColor="blue.500" />
                    <Button colorScheme="blue" variant="solid" borderRadius="full">
                        New Group +
                    </Button>

                    {chats.length === 0 ? (
                        // No chats available view
                        <VStack align="center" mt={8} spacing={4}>
                            <Avatar size="2xl" bg="blue.600" color="white" />
                            <Text fontSize="lg" fontWeight="bold" color="blue.700">
                                No Contacts Yet
                            </Text>
                            <Text color="gray.600">Start a new chat or search for people</Text>
                        </VStack>
                    ) : (
                        // Chat list view when chats are available
                        <VStack align="stretch" mt={4} spacing={4}>
                            {chats.map((chat, idx) => (
                                <HStack key={idx} align="center" spacing={4}>
                                    <Avatar name={chat.name} bg="blue.600" />
                                    <Box>
                                        <Text fontWeight="bold">{chat.name}</Text>
                                        <Text fontSize="sm" color="gray.500">{chat.lastMessage}</Text>
                                    </Box>
                                </HStack>
                            ))}
                        </VStack>
                    )}
                </VStack>
            </Box>

            {/* Right Main Chat Area */}
            <Box w="75%" p={4} bg="white">
                {chats.length === 0 ? (
                    // Show when no chats are available
                    <Flex align="center" justify="center" h="100%" direction="column" shadow="xl" borderRadius="md" bg="blue.100">
                        <Avatar size="2xl" bg="blue.600" color="white" />
                        <Text fontSize="2xl" fontWeight="bold" mt={4} color="blue.700">
                            Welcome <Text as="span" color="blue.500">User</Text>
                        </Text>
                        <Text color="gray.600" mt={2}>No chats available</Text>
                    </Flex>
                ) : (
                    <Box h="80%" bg="white" p={4} shadow="md" borderRadius="md">
                        {/* Chat Header */}
                        <Flex justify="space-between" align="center" mb={4} p={2} bg="blue.100" borderRadius="md">
                            <HStack align="center" spacing={4}>
                                <Avatar name="Abu Abdullah Nugraha" bg="blue.600" />
                                <Text fontSize="lg" fontWeight="bold" color="blue.700">Ahmed</Text>
                            </HStack>
                            {/* Settings Button Removed */}
                        </Flex>

                        {/* Chat Messages */}
                        <VStack align="stretch" spacing={3} overflowY="auto" h="calc(100% - 50px)">
                            {["Hey, how's it going?", "Looking forward to meeting you.", "See you soon!","Hey, how's it going?", "Looking forward to meeting you.", "See you soon!"].map((msg, idx) => (
                                <Box key={idx} alignSelf={idx % 2 === 0 ? "flex-start" : "flex-end"} maxW="75%">
                                    <Text
                                        bg={idx % 2 === 0 ? "blue.50" : "blue.500"}
                                        color={idx % 2 === 0 ? "black" : "white"}
                                        p={3}
                                        borderRadius="lg"
                                        shadow="md"
                                    >
                                        {msg}
                                    </Text>
                                    <HStack justify={idx % 2 === 0 ? "flex-start" : "flex-end"}>
                                        <IconButton
                                            aria-label="React with emoji"
                                            icon={<FaRegLaugh />}
                                            size="sm"
                                            variant="ghost"
                                            colorScheme="blue"
                                        />
                                    </HStack>
                                </Box>
                            ))}
                        </VStack>

                        {/* Chat Input */}
                        <Flex mt={4} align="center">
                            <IconButton
                                aria-label="Choose emoji"
                                icon={<FaSmile />}
                                // variant="outline"
                                mr={2}
                                colorScheme="blue"
                            />
                            <Input placeholder="Type your message..." focusBorderColor="blue.500" />
                            <IconButton
                                aria-label="Send message"
                                icon={<FaPaperPlane />}
                                size="lg"
                                ml={2}
                                colorScheme="blue"
                            />
                        </Flex>
                    </Box>
                )}
            </Box>
        </Flex>
    );
}
