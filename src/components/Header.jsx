import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useRecoilValue } from 'recoil';
import Logout from './Logout';
import userAtom from '../atoms/userAtom';
import { BiSolidBookmarkHeart, BiSolidBookmarkAlt } from "react-icons/bi";
import { IoHome } from "react-icons/io5";
import { MdCreateNewFolder, MdPerson } from "react-icons/md"; // Import MdPerson for profile icon
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  return (
    <Flex gap={10} justifyContent={"center"} alignItems={"center"} mb={"80px"} position={"sticky"} justify="center">
      <Text m={10} flex={30} fontSize="lg" color="gray.100">
        <Text as="span" color='red.500' fontWeight="bold">Hello </Text>{user?.name}
      </Text>
      <Text
        m={10}
        flex={30}
        fontSize="5xl"
        fontWeight="bold"
        color="white"
        p={3}
        borderRadius="md"
        textShadow="0px 0px 8px rgba(255, 255, 255, 0.8)"
      >
        NEXTFLIX
      </Text>
      <Flex flex={30} gap={55}>
        <IoHome size={25} color='white' cursor={"pointer"} onClick={() => navigate("/")} />
        {user?.username !== 'yash11' && (
          <>
            <BiSolidBookmarkAlt size={25} color='white' cursor={"pointer"} onClick={() => navigate("/watchlist")} />
            <BiSolidBookmarkHeart size={25} color='white' cursor={"pointer"} onClick={() => navigate("/favorites")} />
          </>
        )}
        {user?.username === 'yash11' && (
          <>
            <MdCreateNewFolder size={24} color='white' cursor={"pointer"} onClick={() => navigate('/create')} />
            <MdPerson size={24} color='white' cursor={"pointer"} onClick={() => navigate('/manage-users')} />
          </>
        )}
      </Flex>
      <Logout />
    </Flex>
  );
};

export default Header;
