import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Popover, PopoverTrigger, PopoverContent,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom'; // Import React Router's Link component
import Logo from "./Images/Logo.jpg";
import {AuthContext} from "../../ContextApi/AuthcontextProvider" 
import {useContext} from "react";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  const linkColor = useColorModeValue('white', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  
  const { isLogged,logout } =useContext(AuthContext);

  // console.log(isLogged);

  const handleJdata=()=>{
    let logindata=JSON.parse(localStorage.getItem("loginUser")) || "";
    // console.log(logindata);
    if(logindata){

      let Jdata=JSON.parse(localStorage.getItem(`${logindata}reservData`)) || "";
      if(Jdata){
        // console.log(Jdata.country);
        alert("Your Journey is set to "+ " " +Jdata.country);
      }
      else{
        alert("no data found");
      }
    }
    else{
      alert("no data found");
    }
    
  }

  return (
    <Box>
      <Flex
        backgroundColor={useColorModeValue('rgb(124, 141, 211)', 'gray.800')}
        color={useColorModeValue('white', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
          >
            <ReactRouterLink to="/"> {/* Use React Router's Link component */}
              <img src={Logo} alt="" />
            </ReactRouterLink>
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav
              linkColor={linkColor}
              linkHoverColor={linkHoverColor}
              popoverContentBgColor={popoverContentBgColor}
            />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          {/* check local storage */}
          {
            isLogged?
            <>
              <Button onClick={handleJdata}>My Journy Details</Button>
              <h1>Welcome {JSON.parse(localStorage.getItem("loginUser"))}</h1>
              <Button
              as={'a'}
              fontSize={'sm'}
              fontWeight={600}
              variant={'link'}
              href={'#'}
              color={"white"}
              onClick={logout}>
              Logout
            </Button>
            </>
            :
            <><Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={600}
            variant={'link'}
            href={'#'}
            color={"white"}
          >
           <ReactRouterLink to="/login"> Sign In</ReactRouterLink>
          </Button>
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            href={'#'}
            _hover={{
              bg: 'pink.300',
            }}
          >
           <ReactRouterLink to="/signup"> Sign Up</ReactRouterLink>
          </Button></>
          }
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ linkColor, linkHoverColor, popoverContentBgColor }) => {
  return (
    <Stack direction={'row'} spacing={4} align={'center'}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <ReactRouterLink
                p={2}
                to={navItem.href ?? '/'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </ReactRouterLink>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <ReactRouterLink
      to={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </ReactRouterLink>
  );
};

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue('rgb(26, 29, 46)', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={ReactRouterLink}
        to={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('white', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
           h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <ReactRouterLink key={child.label} py={2} to={child.href}>
                {child.label}
              </ReactRouterLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  
  {
    label: 'Services',
   href:'/ourworlds'
  },
  {
    label: 'About',
    href: '/',
  },
  
];
