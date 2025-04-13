import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Flex, Text, Box, Stack } from '@chakra-ui/react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users from the backend
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  // Delete user by ID
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId)); // Update state to remove the deleted user
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Manage Users</Text>
      <Stack direction="row" spacing={4} mb={4}>
        <Button 
          colorScheme="teal" 
          bg="white" 
          color="black" 
          _hover={{ bg: 'red.400', color: 'white' }}
          onClick={fetchUsers} // Fetch users on button click
        >
          View Users
        </Button>
        <Button 
          colorScheme="teal" 
          bg="white" 
          color="black" 
          _hover={{ bg: 'red.400', color: 'white' }}
        >
          Delete Users
        </Button>
      </Stack>
      {loading ? (
        <Text>Loading users...</Text>
      ) : (
        users.map(user => (
          <Flex key={user._id} align="center" justify="space-between" p={4} bg="gray.100" mb={2} borderRadius="md">
            <Text>{user.name} ({user.username}) - {user.email}</Text>
            <Button 
              colorScheme="red" 
              onClick={() => deleteUser(user._id)}
              _hover={{ bg: 'red.400', color: 'white' }}
            >
              Delete
            </Button>
          </Flex>
        ))
      )}
    </Box>
  );
};

export default ManageUsers;
