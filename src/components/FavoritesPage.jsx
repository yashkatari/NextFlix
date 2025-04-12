import { Flex, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard';

const FavoritesPage = () => {
  const [movies, setMovies] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetch("/api/users/favorites");
        const data = await res.json();
        if (data.error) {
          toast({
            title: "Error",
            description: data.error,
            status: "error",
          });
          return;
        }
        // console.log(data);
        setMovies(data);
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
        });
      }
    }
    getMovies();
  }, [toast])
  return (
    <Flex flexDirection={"column"}>
      <Text
        fontSize="3xl"
        fontWeight="extrabold"
        color="white"
        textAlign="center"
        mb={8}
        textTransform="uppercase"
        letterSpacing="widest"
        border={"2px solid red"}
        p={4}
        borderRadius="full"
        bg="red.500"
      >
        Favorites
      </Text>
      <Flex gap={10} flexWrap={"wrap"}>
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </Flex>
    </Flex>
  )
}

export default FavoritesPage
