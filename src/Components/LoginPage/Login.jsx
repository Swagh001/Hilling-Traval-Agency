import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';


  import { useContext, useState } from "react";
  import { useNavigate ,Link, json} from "react-router-dom";
  import { AuthContext } from "../../ContextApi/AuthcontextProvider";
  import axios from 'axios';
  
  export default function Login() {

    const { isLogged, login, logout }
     = useContext(AuthContext);
    const   Navigate=useNavigate();
    const toast=useToast();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = (e) => {
      e.preventDefault();
      let userData=async()=>{
        try{
          // https://hilling-traval-agency-backend-production.up.railway.app
          let res= await axios.post(`https://hilling-traval-agency-backend-production.up.railway.app/login`,{
            email: email,
            password: password,
          })
          // const token = res.data.token;
          // localStorage.setItem("token", token);
          // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          console.log(res);
          if(res.data==='error'){
            alert("user not found")
          }
          else if(res.data==='wrong'){
            alert("wrong details")
          }
          else{
            alert("login Done");
            const token = res.data.token;
            localStorage.setItem("token", token);
            login();
            localStorage.setItem("loginUser",JSON.stringify(email.split("@")[0]));
            Navigate("/");
          }
        }
        catch(err){
          console.log(err)
        }
      }
      userData();
    };



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
              <Stack spacing={8}>
            <Heading fontSize={'4xl'} textAlign={'center'} >
              Sign in to your Account
            </Heading>
           
            <Stack>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email"
                style={{width:"100%"}}
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 
                 variant="filled"
                 bg={"purple.50"} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" 
                style={{width:"100%"}}
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 variant="filled"
                 bg={"purple.50"}/>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>

                </Stack>
                <Button
                  onClick={handleLogin}
                  bg={'blue.500'}

                  color={'white'}
                  _hover={{
                    bg: 'blue.600',
                  }}>
                  Sign in
                </Button>
                </Stack>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  New User? <Link color={'blue.400'} to={'/signup'}>Register</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }