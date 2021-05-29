import React from 'react';
import { Stack, HStack, IconButton, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionStack = motion(Stack);

export function Navbar({ color }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <MotionStack
        id="navbar"
        className="navbar"
        position="absolute"
        top={0}
        justifyContent="center"
        mt={5}
        px={{ base: 10, sm: 20, lg: 20, xl: 80 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          w="100%"
          color={color}
        >
          <Stack alignItems="center">
            <HStack
              as={'nav'}
              spacing={10}
              display={{ base: 'none', md: 'flex' }}
              className="nav-links"
            >
              <IconButton
                isRound="true"
                padding={0}
                onClick={toggleColorMode}
                icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
              />
            </HStack>
          </Stack>
        </Stack>
      </MotionStack>
    </>
  );
}
