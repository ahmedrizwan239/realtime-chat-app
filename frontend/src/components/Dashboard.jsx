import React from 'react';
import { Flex, Box, VStack, Text, Input, Button, Avatar, Image } from "@chakra-ui/react";

export default function Dashboard() {
    return (
        <Flex h="100vh" bg="blue.50">
            {/* Left Sidebar */}
            <Box w="30%" bg="white" p={4} borderRight="1px solid #cbd5e0" shadow="lg">
                <VStack align="stretch" spacing={6}>
                    <Text fontSize="2xl" fontWeight="bold" color="blue.700">
                        Messages
                    </Text>
                    <Input placeholder="Search" focusBorderColor="blue.500" />
                    <Button colorScheme="blue" variant="solid" borderRadius="full">
                        New Group +
                    </Button>

                    <VStack align="center" spacing={4} mt={8}>
                        <Image
                            src="/path-to-your-illustration.png" // Replace with your illustration path
                            alt="No Contacts Illustration"
                            boxSize="150px"
                            opacity={0.8}
                        />
                        <Text fontSize="lg" fontWeight="bold" color="blue.700">
                            No Contacts Yet
                        </Text>
                        <Text color="gray.600">Search for people</Text>
                    </VStack>
                </VStack>
            </Box>

            {/* Right Main Area */}
            <Box w="70%" p={4} bg="white">
                <Flex align="center" justify="center" h="100%" direction="column" shadow="xl" borderRadius="md" bg="blue.100">
                    <Avatar size="2xl" name="Game Show" bg="blue.600" color="white" />
                    <Text fontSize="2xl" fontWeight="bold" mt={4} color="blue.700">
                        Welcome <Text as="span" color="blue.500">User</Text>
                    </Text>
                </Flex>
            </Box>
        </Flex>
    );
}
