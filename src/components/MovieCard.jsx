import { Badge, Box, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie._id}`}>
      <Box
        width="250px"
        overflow="hidden"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        bg="red.600"
        _hover={{
          bg: 'red.900', transform: 'scale(1.08)',  // Apply scale transformation on hover
          transition: 'transform 0.5s',
        }}
      >
        <Box position="relative" aspectRatio="3 / 4">
          <Image
            src={movie.posterUrl} // Example image URL
            alt={movie.title}
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </Box>
        <Box padding="4" bg={"red.600"}>
          <Text fontSize="xl" fontWeight="bold" mb="2" noOfLines={1} color={"black"}>
            {movie.title}
          </Text>
          <Badge variant="subtle" colorScheme="gray.600">
            {movie.genre}
          </Badge>
        </Box>
      </Box>
    </Link>
  );
};

export default MovieCard;
