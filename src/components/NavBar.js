import { Container, Heading, HStack, Link } from '@chakra-ui/react';

const Logo = () => {
  return (
    <Heading
      as='h1'
      bgGradient='linear(to-r, red.500, red.400)'
      bgClip='text'
      fontSize='4xl'
      fontWeight='extrabold'
    >
      <Link to='/'>POMO</Link>
    </Heading>
  );
};

const NavBar = () => {
  return (
    <header>
      <Container maxW='container.lg'>
        <HStack py={8} px={[1, 3]}>
          <Logo />
        </HStack>
      </Container>
    </header>
  );
};

export default NavBar;
