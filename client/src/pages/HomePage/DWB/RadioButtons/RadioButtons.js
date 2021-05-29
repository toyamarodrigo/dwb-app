import React from 'react';
import { Box, useColorModeValue, useRadio } from '@chakra-ui/react';

export const RadioButtons = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const color = useColorModeValue('black', 'black');

  return (
    <>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
        bg="whiteAlpha.800"
        color={color}
        _checked={{
          bg: 'red.500',
          color: 'white',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={2}
      >
        {props.children}
      </Box>
    </>
  );
};
