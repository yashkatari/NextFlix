import React, { useEffect, useState } from 'react';
import { Box, Flex, useToast,Text } from '@chakra-ui/react';
import MovieCard from './MovieCard';
import Header from './Header';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const getHomeMovies = async () => {
      try {
        const res = await fetch("/api/users/home");
        const data = await res.json();
        if (data.error) {
          toast({
            title: 'Error',
            description: data.error,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          return;
        }
        setMovies(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch movies',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }

    getHomeMovies();
  }, [toast]);

  return (
    <Box minHeight="100vh" padding="6">
      <>
      <Flex gap={10} flexWrap="wrap" ml="-4" mt="-5" mb="30px">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
        
      </Flex>
      <Box  padding="2" textAlign="center" color="white" opacity={0.5} mt={6}>
        <Text fontSize="sm">&copy; Developed by TEAM SCY</Text>
      </Box>
      </>
    </Box>
  );
};

export default HomePage;
