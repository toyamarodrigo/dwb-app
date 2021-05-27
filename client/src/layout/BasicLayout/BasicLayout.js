import React from 'react';
import { Stack } from '@chakra-ui/react';
import { Footer } from '../../components';

export const BasicLayout = ({ children }) => {
  return (
    <Stack
      position="relative"
      overflowX="hidden"
      h="100vh"
      w="100vw"
      justifyContent="center"
      alignItems="center"
      bg={'teal.200'}
      spacing={4}
    >
      {children}
      <Footer />
    </Stack>
  );
};
