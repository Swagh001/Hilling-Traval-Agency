import React from 'react';
import axios from "axios";
import {blog} from "./Data/data";
import {
    Box,
    Flex,
    // Input,
    HStack,
    Heading,
    Link,
    // Button,
    // Grid,
    // Img,
    Text,
    Wrap,
    Image,
    WrapItem
} from '@chakra-ui/react';
import { useParams } from 'react-router';


const BlogPost = () => {
    const[post,setPost] = React.useState({});
    const {id}=useParams();
    // console.log(id);
      const fetchData = async () => {
        // https://hilling-traval-agency-backend-production.up.railway.app
        const res = await axios.get(`https://hilling-traval-agency-backend-production.up.railway.app/blog/${id}`);
        // console.log(res.data[0]);
        setPost(res.data[0]);
      };
    React.useEffect(()=>{
        fetchData();
    },[]);

    return (
        <Box fontSize={"16px"} h={"90vh"} backgroundSize={"cover"} backgroundPosition={"center center"} >
          <Box>
                <Flex justifyContent={"center"}>
                             <Wrap spacing="30px" marginRight={"10px"} marginTop="5" p={"1rem"} w={"100%"} borderRadius={"0.375rem"} background={"#FFFAF0"} boxShadow={" 0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06)"}>
                                <WrapItem width={{ base: '100%', sm: '100%', md: '100%', lg: '100%' }}>
                                    <Box w="100%" >
                                        <Heading fontSize="xl" marginTop="2" mb={"1em"}>
                                            <Link textDecoration="none" fontWeight={"700"} fontSize={"30px"} _hover={{ textDecoration: 'none' }}>
                                                {post.name}          </Link>
                                        </Heading>

                                        <HStack marginTop="2" spacing="2" display="flex" justifyContent={"center"} mb={"1em"}  >
                                            <Text>{post.author}</Text>
                                            <Text>|</Text>
                                            <Text>{post.date}</Text>
                                        </HStack>

                                        <Box borderRadius="lg" overflow="hidden" mb={"1em"} gap={"50px"} display="flex" justifyContent={"center"}>
                                            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                                                <Image
                                                    transform="scale(1.0)"
                                                    src={post.img}
                                                    alt="some text"
                                                    objectFit="contain"
                                                    transition="0.3s ease-in-out"
                                                    _hover={{
                                                        transform: 'scale(1.05)',
                                                    }}
                                                    w={"500px"}
                                                    h={"300px"}
                                                />
                                            </Link>
                                            <Text as="p" fontSize="md" marginTop="2" width={"50%"} textAlign={"justify"}>
                                                {blog.description}
                                            </Text>
                                        </Box>
                                        
                                    </Box>
                                </WrapItem>
                            </Wrap>

                      
                </Flex>
            </Box>
        </Box>
    )
}

export default BlogPost;