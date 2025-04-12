import { Flex, Box, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link, Alert, AlertIcon } from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSetRecoilState } from 'recoil'
import authScreenAtom from '../atoms/authAtom';
import userAtom from '../atoms/userAtom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // New error state

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const setUser = useSetRecoilState(userAtom);

  const handleLogin = async () => {
    setLoading(true);
    setError(""); // Reset error state on new login attempt
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();
      if (data.error) {
        setError("Incorrect username & password"); // Set error message
        return;
      }
      localStorage.setItem("user-app", JSON.stringify(data));
      setUser(data);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    
    <Flex
    align="center"
    justify="center"
    position="absolute"  // Ensure it covers the entire viewport
    top="0"
    left="0"
    bottom="0"
    right="0"
    bgImage="url('loginbg.jpg')"  // Adjust to your image path
    bgSize="cover"
    bgPosition="center"
    bgRepeat="no-repeat"
    width="100vw"  // Full viewport width
    height="100vh"  // Full viewport height
  
  
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Login
          </Heading>
        </Stack>
        
        {error && (
          <Alert status="error" mb={4} rounded="md">
            <AlertIcon />
            {error}
          </Alert>
        )}
        
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          w={{
            base: "full",
            sm: "400px"
          }}
        >
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>UserName</FormLabel>
              <Input type="text"
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}
                  value={inputs.password}
                  onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Logging in"
                size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color={'white'}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800"),
                }}
                onClick={handleLogin}
                isLoading={loading}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Don’t have an account? <Link color={'blue.400'}
                  onClick={() => setAuthScreen("signup")}
                >Sign up</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login;
