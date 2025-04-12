import { Flex, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard';

const WatchListPage = () => {
  const [movies, setMovies] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetch("/api/users/watchlist");
        const data = await res.json();
        if (data.error) {
          toast({
            title: "Error",
            description: data.error,
            status: "error",
          });
          return;
        }
        if (Array.isArray(data)) {
          setMovies(data);
        } else {
          setMovies([]); // In case of unexpected data structure, set to an empty array
        }
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
        fontSize="3xl" // Larger font size for title
        fontWeight="extrabold" // Makes the title extra bold
        color="white" // White text color for better contrast
        textAlign="center" // Centers the text
        mb={8} // Adds more margin at the bottom
        textTransform="uppercase" // Makes the text uppercase
        letterSpacing="widest" // Adds more spacing between letters
        border={"2px solid red"} // Adds a white border around the title
        p={4} // Padding inside the text
        borderRadius="full" // Rounds the text box
        bg="red.500" // Adds a transparent background for the title
      >
        WatchList
      </Text>
      <Flex gap={10} flexWrap={"wrap"}>
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </Flex>
    </Flex>
  )
}

export default WatchListPage
