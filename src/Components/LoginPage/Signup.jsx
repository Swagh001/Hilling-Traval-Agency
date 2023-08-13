import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import {Link,useNavigate} from "react-router-dom"
import axios from 'axios';
  // import Login from './Login';
  
  
  export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate=useNavigate();
    const toast=useToast();
    const [newUsername, setNewUsername] = useState({
      email: "",
      password: "",
      name: "",
      lastname:"",
      confirmpassword:""
    });
    const handleSignup=(e)=>{
      e.preventDefault();

      if (
        (newUsername.name.length !== 0 &&
        newUsername.email.length !== 0 &&
        newUsername.password.length !==0 )&&(newUsername.password===newUsername.confirmpassword))
        {
          toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          navigate("/login") 
        }
        else if(newUsername.password!==newUsername.confirmpassword){
          toast({
            title: 'Please check your Password',
            status: 'error',
            duration: 2000,
            isClosable: true,
          })
        }
      else {
        toast({
          title: 'Please enter All feilds',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      } 
      // localStorage.setItem("user", JSON.stringify(newUsername))
      let userData=async()=>{
        try{
          let res= await axios.post(`http://localhost:8081/signup`,{
            fname: newUsername.name,
            lname: newUsername.lastname,
            email: newUsername.email,
            password: newUsername.password,
        })
        // console.log(newUsername);
        }
        catch(err){
          console.log(err)
        }
      }
      userData();
    }
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
            <Heading fontSize={'4xl'} textAlign={'center'} spacing={6}>
              Register
            </Heading>
              <HStack>
                
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input 
                    type="text" 

                      variant="filled"
                      bg={"purple.50"}
                      value={newUsername.name}
                      onChange={(e) => setNewUsername({...newUsername, name:e.target.value})}
                      />
                    
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text"
                     variant="filled"
                     bg={"purple.50"}
                     value={newUsername.lastname}
                      onChange={(e) => setNewUsername({...newUsername, lastname:e.target.value})}
                     />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email"

                 variant="filled"
                 bg={"purple.50"}
                 value={newUsername.email}
                 onChange={(e) => setNewUsername({...newUsername, email:e.target.value})} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'}

                    variant="filled"
                    bg={"purple.50"}
                    value={newUsername.password}
                    onChange={(e) => setNewUsername({...newUsername, password:e.target.value})} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="confirm password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'}

                    variant="filled"
                    bg={"purple.50"}
                    value={newUsername.confirmpassword}
                    onChange={(e) => setNewUsername({...newUsername, confirmpassword:e.target.value})} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.500'}
                  color={'white'}
                  onClick={handleSignup}
                  _hover={{
                    bg: 'blue.600',

                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'} to={'/login'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }