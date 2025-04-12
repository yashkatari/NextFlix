import { useToast, Box, Button, FormControl, FormLabel, Input, Textarea, Heading, VStack, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const CreateMovie = () => {
  const toast = useToast();
  const [movieData, setMovieData] = useState({
    title: '',
    year: '',
    genre: '',
    runtime: '',
    rating: '',
    cast: { director: '', hero: '', heroine: '', villain: '' },
    plot: '',
    posterUrl: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCastChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevState) => ({
      ...prevState,
      cast: { ...prevState.cast, [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedData = {
      ...movieData,
      cast: [
        movieData.cast.director,
        movieData.cast.hero,
        movieData.cast.heroine,
        movieData.cast.villain,
      ],
    };

    try {
      const response = await fetch('/api/users/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
      const data = await response.json();
      if (data.error) {
        toast({
          title: 'Error',
          description: data.error,
          status: 'error',
          isClosable: true,
        });
        return;
      }
      console.log(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box maxW="500px" mx="auto" mt="8" p="8" boxShadow="lg" bg="gray.700" borderRadius="md">
      <Heading as="h2" mb="6" color="red.500" textAlign="center">
        Create Movie
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing="4">
          <FormControl id="title" isRequired>
            <FormLabel color="gray.300">Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={movieData.title}
              onChange={handleInputChange}
              placeholder="Enter movie title"
              bg="gray.600"
              color="white"
              _placeholder={{ color: "gray.400" }}
            />
          </FormControl>

          <FormControl id="year" isRequired>
            <FormLabel color="gray.300">Year</FormLabel>
            <Input
              type="text"
              name="year"
              value={movieData.year}
              onChange={handleInputChange}
              placeholder="Enter release year"
              bg="gray.600"
              color="white"
              _placeholder={{ color: "gray.400" }}
            />
          </FormControl>

          <FormControl id="genre" isRequired>
            <FormLabel color="gray.300">Genre</FormLabel>
            <Input
              type="text"
              name="genre"
              value={movieData.genre}
              onChange={handleInputChange}
              placeholder="Enter genre"
              bg="gray.600"
              color="white"
              _placeholder={{ color: "gray.400" }}
            />
          </FormControl>

          <FormControl id="runtime" isRequired>
            <FormLabel color="gray.300">Runtime</FormLabel>
            <Input
              type="text"
              name="runtime"
              value={movieData.runtime}
              onChange={handleInputChange}
              placeholder="Enter runtime"
              bg="gray.600"
              color="white"
              _placeholder={{ color: "gray.400" }}
            />
          </FormControl>

          <FormControl id="rating" isRequired>
            <FormLabel color="gray.300">Rating</FormLabel>
            <Input
              type="text"
              name="rating"
              value={movieData.rating}
              onChange={handleInputChange}
              placeholder="Enter rating"
              bg="gray.600"
              color="white"
              _placeholder={{ color: "gray.400" }}
            />
          </FormControl>

          <Heading size="sm" color="gray.400" alignSelf="start">
            Cast
          </Heading>
          <HStack spacing="4">
            <FormControl id="director" isRequired>
              <FormLabel color="gray.300">Director</FormLabel>
              <Input
                type="text"
                name="director"
                value={movieData.cast.director}
                onChange={handleCastChange}
                placeholder="Director"
                bg="gray.600"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>
            <FormControl id="hero" isRequired>
              <FormLabel color="gray.300">Hero</FormLabel>
              <Input
                type="text"
                name="hero"
                value={movieData.cast.hero}
                onChange={handleCastChange}
                placeholder="Hero"
                bg="gray.600"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>
          </HStack>

          <HStack spacing="4">
            <FormControl id="heroine" isRequired>
              <FormLabel color="gray.300">Heroine</FormLabel>
              <Input
                type="text"
                name="heroine"
                value={movieData.cast.heroine}
                onChange={handleCastChange}
                placeholder="Heroine"
                bg="gray.600"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>
            <FormControl id="villain" isRequired>
              <FormLabel color="gray.300">Villain</FormLabel>
              <Input
                type="text"
                name="villain"
                value={movieData.cast.villain}
                onChange={handleCastChange}
                placeholder="Villain"
                bg="gray.600"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>
          </HStack>

          <FormControl id="plot" isRequired>
            <FormLabel color="gray.300">Plot</FormLabel>
            <Textarea
              name="plot"
              value={movieData.plot}
              onChange={handleInputChange}
              placeholder="Enter plot"
              bg="gray.600"
              color="white"
              _placeholder={{ color: "gray.400" }}
            />
          </FormControl>

          <FormControl id="posterUrl" isRequired>
            <FormLabel color="gray.300">Poster URL</FormLabel>
            <Input
              type="text"
              name="posterUrl"
              value={movieData.posterUrl}
              onChange={handleInputChange}
              placeholder="Enter poster URL"
              bg="gray.600"
              color="white"
              _placeholder={{ color: "gray.400" }}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="red"
            isLoading={isSubmitting}
            w="full"
            mt="4"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreateMovie;
