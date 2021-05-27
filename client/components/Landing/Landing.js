import React, { useState } from 'react';
import {
  Stack,
  Text,
  Input,
  FormControl,
  Button,
  Icon,
  useRadioGroup,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { RadioButtons } from './RadioButtons/RadioButtons';
import { motion } from 'framer-motion';

export const Landing = () => {
  const [formValues, setFormValues] = useState();

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      justifyContent={{ md: 'center', lg: 'space-around' }}
      alignItems="center"
      w="50%"
      spacing={4}
    >
      <Logo />
      <Form formValues={formValues} setFormValues={setFormValues} />
    </Stack>
  );
};

const Logo = () => {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Text as={'h1'}>dwb</Text>
    </Stack>
  );
};

const Form = ({ formValues, setFormValues }) => {
  const options = ['mp3', 'mp4'];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'format',
  });

  const group = getRootProps();
  const MotionStack = motion(Stack);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit', formValues);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Stack
      as={'form'}
      w={{ sm: '80%', md: '80%', lg: '40%' }}
      onSubmit={handleSubmit}
    >
      <FormControl bg="whiteAlpha.500" color="black">
        <Input
          name="url"
          placeholder="https://youtube..."
          onChange={handleChange}
        />
      </FormControl>
      <MotionStack
        as={FormControl}
        direction="row"
        name="format"
        justifyContent="center"
        alignItems="center"
        w="100%"
        {...group}
      >
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioButtons key={value} {...radio} handleChange={handleChange}>
              {value.toUpperCase()}
            </RadioButtons>
          );
        })}
      </MotionStack>
      <Button type="submit" bg="whatsapp.500" w="100%" boxShadow="lg">
        <Icon as={DownloadIcon} />
        <Text>Download</Text>
      </Button>
    </Stack>
  );
};
