import React from 'react';
import { Box, useRadio } from '@chakra-ui/react';

export const RadioButtons = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" w="100%" onChange={props.handleChange}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
        bg="whiteAlpha.800"
        color="blackAlpha.900"
        _checked={{
          bg: 'blue.600',
          color: 'white',
          borderColor: 'blue.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  );
};
