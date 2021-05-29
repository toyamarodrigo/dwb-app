import React from 'react';
import { Stack, useColorModeValue } from '@chakra-ui/react';
import { Footer, Navbar } from '../../components';

export const BasicLayout = ({ children }) => {
  const colorFooter = useColorModeValue('black', 'white');
  const bgColor = useColorModeValue('twitter.200', 'messenger.900');
  return (
    <Stack
      position="relative"
      overflowX="hidden"
      h="100vh"
      w="100vw"
      justifyContent="center"
      alignItems="center"
      spacing={4}
      bg={bgColor}
    >
      <Navbar />
      <Stack justifyContent="center" alignItems="center" spacing={2}>
        {children}
      </Stack>
      <Footer color={colorFooter} />
    </Stack>
  );
};
