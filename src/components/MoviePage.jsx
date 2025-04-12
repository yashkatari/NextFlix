import { Box, Button, Flex, Image, Skeleton, Spinner, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { BiSolidBookmarkHeart } from "react-icons/bi";
import { BiSolidBookmarkAlt } from "react-icons/bi";
import { MdDeleteSweep } from "react-icons/md";

const MoviePage = () => {
  const [movie, setMovie] = useState(null);
  const toast = useToast();
  const movieId = useParams();
  const [user, setUser] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(true);
  const [addingToWatch, setAddingToWatch] = useState(false);
  const [addingToFav, setAddingToFav] = useState(false);
  const [inWatchList, setInWatchList] = useState(user?.watchlist?.includes(movieId.id));
  const [inFavorites, setInFavorites] = useState(user?.favorites?.includes(movieId.id));
  const [deleting, isDeleting] = useState(false);
  const navigate = useNavigate();

  // console.log(user.watchlist);
  // console.log(movieId);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getMovie = async () => {
      try {
        const res = await fetch(`/api/users/movies/${movieId.id}`);
        const data = await res.json();
        if (data.error) {
          toast({
            title: 'Error',
            description: data.error,
            status: 'error',
          });
          return;
        }
        // console.log(data);

        setMovie(data);
        setInWatchList(user?.watchlist.includes(movieId.id));
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch movie data',
          status: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    getMovie();
  }, [user, toast, movieId.id]);

  // useEffect(() => {
  //   if (user) {
  //     setInWatchList(user.watchlist?.includes(movieId.id));
  //     setInFavorites(user.favorites?.includes(movieId.id));
  //   }
  // }, [user, movieId.id]);


  const handleDeleteMovie = async (e) => {
    e.preventDefault();
    if (deleting) {
      return;
    }
    isDeleting(true);
    try {
      const res = await fetch(`/api/users/delete/${movieId.id}`, {
        method: 'DELETE', // Use the DELETE method
      });
      const data = await res.json();
      if (data.error) {
        toast({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
        return;

      }
      navigate('/');
      toast({
        title: 'Success',
        description: 'Movie deleted successfully',
        status: 'success',
      });
      setUser((prevUser) => ({
        ...prevUser,
        watchlist: prevUser.watchlist.filter((id) => id !== movieId.id),
      }));
      setUser((prevUser) => ({
        ...prevUser,
        favorites: prevUser.favorites.filter((id) => id !== movieId.id),
      }));
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete movie',
        status: 'error',
      });
    } finally {
      isDeleting(false);
    }
  }

  const addRemoveFromWatchList = async () => {
    // Toggle the addingToWatch state
    if (addingToWatch) {
      return;
    }
    setAddingToWatch(true);
    try {
      const res = await fetch(`/api/users/movies/watch/${movieId.id}`, {
        method: 'POST', // Specify the method as POST
      });
      const data = await res.json();
      if (data.error) {
        toast({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
        return;
      }


      if (data.message.split(" ")[1] === "removed") {
        setInWatchList(false);
      } else {
        setInWatchList(true);
      }

      // console.log(data);
      // Update the user state with the new watchlist
      // console.log(data.user);
      localStorage.setItem("user-app", JSON.stringify(data.user));
      setUser(data.user);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add or remove movie from watchlist',
        status: 'error',
      });
    } finally {
      setAddingToWatch(false);
    }
  }

  const addRemoveFromFavorites = async () => {
    // Toggle the addingToWatch state
    if (addingToFav) {
      return;
    }
    setAddingToFav(true);
    try {
      const res = await fetch(`/api/users/movies/fav/${movieId.id}`, {
        method: 'POST', // Specify the method as POST
      });
      const data = await res.json();
      if (data.error) {
        toast({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
        return;
      }
      if (data.message.split(" ")[1] === "removed") {
        // user?.favorites.pop();
        setInFavorites(false);
      } else {
        // user?.favorites.push(movieId.id);
        setInFavorites(true);
      }
      // console.log(data);
      localStorage.setItem("user-app", JSON.stringify(data.user));
      setUser(data.user);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add or remove movie from Favorites',
        status: 'error',
      });
    } finally {
      setAddingToFav(false);
    }
  }
  return (
    <Flex w={"full"} mb={"0px"} gap={10} justifyContent="center" alignItems="center">
      {/* Image Section with Skeleton */}
      <Flex flex={33} h={'730px'}>
        {loading ? (
          <Skeleton borderRadius={"lg"} w="full" h="full" />
        ) : (
          <Image
            src={movie?.posterUrl}
            borderRadius={"lg"}
            objectFit="cover"
            w="full"
            h="full"
          />
        )}
      </Flex>

      {/* Movie Details Section with Skeleton */}
      <Flex flexDirection={"column"} flex={60} gap={5}>
        <Box>
          <Skeleton isLoaded={!loading}>
            <Text
              fontWeight={"bold"}
              fontSize={"7xl"}
              
              mb={1}
              lineHeight="1"
              border={"none"}
            >
              {movie?.title}
            </Text>
          </Skeleton>

          <Skeleton isLoaded={!loading}>
            <Text
              fontWeight={"bold"}
              fontSize={"5xl"}
              color="gray.500"
              ml={2}
              mt={0}
            >
              ({movie?.year})
            </Text>
          </Skeleton>
        </Box>

        {/* Genre and Info with Skeleton */}
        <Skeleton isLoaded={!loading}>
          <Flex gap={3} alignItems="center">
            <Button size="md" color={"white"} bg={"red.600"} borderRadius={"3xl"}>
              {movie?.genre}
            </Button>
            <Text fontSize="lg" color="indigo.600">
              {movie?.runtime}
            </Text>
            <Text fontSize="lg" color="yellow.500" fontWeight="bold">
              {movie?.rating} ⭐
            </Text>
          </Flex>
        </Skeleton>

        {/* Plot with Skeleton */}
        <Skeleton isLoaded={!loading}>
          <Text fontSize="lg" lineHeight="1.8" textAlign="justify" p={3} color={'white'} borderRadius={"lg"}>
            {movie?.plot}
          </Text>
        </Skeleton>

        {/* Buttons */}
        <Skeleton isLoaded={!loading}>
          <Flex flexDirection={"row"} gap={15}>
            {user.username !== 'yash11' && (<>
              <Button borderRadius={"3xl"} bg={"red.600"} onClick={addRemoveFromWatchList} isLoading={addingToWatch} loadingText={"Updating WatchList"} rightIcon={
                <Box ml={1}>
                  <BiSolidBookmarkAlt size={20} />
                </Box>
              }>{inWatchList ? "Remove from" : "Add to"} WatchList </Button>
              <Button borderRadius={"3xl"} bg={"red.600"} onClick={addRemoveFromFavorites} isLoading={addingToFav} loadingText={"Updating Favorites"}
                rightIcon={
                  <Box ml={1}>
                    <BiSolidBookmarkHeart size={20} />
                  </Box>
                }
              >{inFavorites ? "Remove from" : "Add to"} Favorites</Button>
            </>)}
            {user.username === 'yash11' && (
              <Button borderRadius={"3xl"} bg={"red.600"} onClick={handleDeleteMovie} isLoading={deleting} loadingText={"Deleting Movie"}
                rightIcon={
                  <Box ml={1}>
                    <MdDeleteSweep size={20} />
                  </Box>
                }
              >Delete Movie </Button>
            )}
          </Flex>
        </Skeleton>

        {/* Cast Section with Skeleton */}
        <Skeleton isLoaded={!loading}>
          <Flex direction="column" mt={4} p={3} borderRadius={"lg"}>
            <Text fontSize="lg" fontWeight="bold" color={"Yellow"}>Cast:</Text>
            <Text fontSize="md" mt={1 } color={"white"}>
              <strong>Director : </strong> {movie?.cast[0]}
            </Text>
            <Text fontSize="md" color={"white"}>
              <strong>Hero :</strong> {movie?.cast[1]}
            </Text>
            <Text fontSize="md" color={"white"} >
              <strong>Heroine :</strong> {movie?.cast[2]}
            </Text>
            <Text fontSize="md" color={"white"}>
              <strong>Villain :</strong> {movie?.cast[3]}
            </Text>
          </Flex>
        </Skeleton>
      </Flex>
    </Flex>
  );
};

export default MoviePage;
